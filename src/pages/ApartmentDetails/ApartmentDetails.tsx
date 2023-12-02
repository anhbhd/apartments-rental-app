import { useEffect, useState } from "react";

import "./ApartmentDetails.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ImagesShow from "../../components/ApartmentDetails/ImagesShow/ImagesShow";

import PropertyDescription from "../../components/ApartmentDetails/PropertyDescription/PropertyDescription";
import CommentsSection from "../../components/ApartmentDetails/CommentSection/CommentsSection";
import Related from "../../components/ApartmentDetails/Related/Related";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { Apartment } from "../../type/Apartment";
import { formatter } from "./../../utils/FormatMoney";
import { secondsToDateTime } from "../../utils/SecondToDate";

import { Review } from "../../type/Review";
import { useAuth } from "../../context/AuthContext";
import ModalBackToPersonalInfo from "../../components/ApartmentDetails/ModalBackToPersonalInfo/ModalBackToPersonalInfo";
import { User } from "../../type/User";
import { RentalApplication } from "../../type/RentalApplication";
import { RentAppStatus } from "../../common/constants/RentalAppStatus";
import SuccessRentModal from "../../components/ApartmentDetails/SuccessRentModal/SuccessRentModal";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
import { mapCollectionToArrayObject } from "../../utils/Mapper";
import { toast } from "react-toastify";
import { getDocument } from "../../services/getDocument";

const ApartmentDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [apartment, setApartment] = useState<Apartment>();
  const [relatedList, setRelatedList] = useState<Apartment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showedReviews, setShowedReviews] = useState<Review[]>([]);
  const reviewsNumPerFetch = 6;
  const [totalReviews, setTotalReviews] = useState<number>(0);

  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);
  const [like, setLike] = useState<boolean>(false);

  const [isModalClose, setIsModalClose] = useState<boolean>(true);
  const [successfulRent, setSuccessfulRent] = useState<boolean>(false);
  const [thisApartmentStatus, setThisApartmentStatus] = useState<string>("");
  const { currentUser } = useAuth();
  const [loadedPromises, setLoadedPromises] = useState<number>(0);
  const [lastDoc, setLastDoc] = useState<any>();
  const [toggleRefetchReviews, setToggleRefetchReviews] =
    useState<boolean>(false);
  const [filterStarsComments, setFilterStarsComments] = useState<number>(0);

  const apartmentId = pathname.split("/").pop() as string;

  useEffect(() => {
    // try to fetch a record in wishlist if the record contain this item id and the user id exist
    const fetchLikeStateOfUserToThisItem = async () => {
      if (currentUser) {
        try {
          const wishlistCollectionRef = collection(db, "wishlist");
          const q = query(
            wishlistCollectionRef,
            where("apartmentId", "==", apartmentId),
            where("userId", "==", currentUser.uid)
          );
          const wishlistCollectionSnapshot = await getDocs(q);

          const fetchedWishlistItemId =
            wishlistCollectionSnapshot.docs.at(0)?.id;

          if (fetchedWishlistItemId) {
            setLike(true);
            setWishlistItemId(fetchedWishlistItemId);
          }
          setLoadedPromises((prevNumState) => prevNumState + 1);
        } catch (err: any) {
          console.log(err);
        }
      } else return;
    };
    fetchLikeStateOfUserToThisItem();
  }, [apartmentId, currentUser, like]);

  const handleDislikeThisApartment = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setLike(false);
    await deleteDoc(doc(db, "wishlist", wishlistItemId as string));
  };
  const handleLikeThisApartment = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (currentUser) {
      setLike(true);
      await addDoc(collection(db, "wishlist"), {
        userId: currentUser.uid,
        createdDate: Timestamp.now(),
        apartmentId: apartmentId,
      });
      // console.log(newDoc);
    } else return;
  };

  // get the apartment doc
  useEffect(() => {
    const fetchThisApartment = async () => {
      const apartmentData: Apartment = await getDocument(
        "apartments",
        apartmentId
      );

      setApartment(apartmentData);
      setLoadedPromises((prevNumState) => prevNumState + 1);
    };
    fetchThisApartment();
  }, [apartmentId]);

  // fetch reviews data for this apartment for the first time mounted

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollectionRef = collection(db, "reviews");

      let baseQuery = query(
        reviewsCollectionRef,
        where("apartmentId", "==", apartmentId),
        orderBy("createdDate", "desc")
      );
      if (filterStarsComments !== 0) {
        baseQuery = query(
          baseQuery,
          where("numberOfStars", "==", filterStarsComments)
        );
      }

      const totalReviews = (await getDocs(baseQuery)).size;
      setTotalReviews(totalReviews);

      baseQuery = query(baseQuery, limit(reviewsNumPerFetch));
      let reviewsData: Review[] = [];
      const fetchedReviewsCollectionSnapshot = await getDocs(query(baseQuery));

      setLastDoc(
        fetchedReviewsCollectionSnapshot.docs[
          fetchedReviewsCollectionSnapshot.docs.length - 1
        ]
      );
      reviewsData = mapCollectionToArrayObject(
        fetchedReviewsCollectionSnapshot
      );

      setReviews(reviewsData);
      setShowedReviews(reviewsData.slice(0, 3));
    };
    fetchReviews();
  }, [apartmentId, toggleRefetchReviews, filterStarsComments]);

  // todo handle show more than three first review

  const handleShowMore = () => {
    if (reviews.length < totalReviews) {
      try {
        const fetchNextThreeReviews = async () => {
          const reviewsCollectionRef = collection(db, "reviews");

          let baseQuery = query(
            reviewsCollectionRef,
            where("apartmentId", "==", apartmentId),
            orderBy("createdDate", "desc")
          );
          if (filterStarsComments !== 0) {
            baseQuery = query(
              baseQuery,
              where("numberOfStars", "==", filterStarsComments)
            );
          }

          baseQuery = query(baseQuery, limit(reviewsNumPerFetch));
          baseQuery = query(baseQuery, startAfter(lastDoc));
          let reviewsData: Review[] = [];
          const fetchedReviewsCollectionSnapshot = await getDocs(
            query(baseQuery)
          );

          setLastDoc(
            fetchedReviewsCollectionSnapshot.docs[
              fetchedReviewsCollectionSnapshot.docs.length - 1
            ]
          );
          reviewsData = mapCollectionToArrayObject(
            fetchedReviewsCollectionSnapshot
          );

          setReviews([...reviews, ...reviewsData]);
        };

        fetchNextThreeReviews();
      } catch (err: any) {
        console.log(err.message);
      }
    }
    setShowedReviews((prev) => [
      ...prev,
      ...reviews.slice(prev.length, prev.length + 3),
    ]);
  };

  //todo fetch related apartment (have the same category :)) )

  useEffect(() => {
    const fetchRelatedList = async () => {
      let apartmentsData: Apartment[] = [];
      try {
        if (apartment) {
          const apartmentsCollectionRef = collection(db, "apartments");

          const q = query(
            apartmentsCollectionRef,
            limit(7),
            where("categoryId", "==", apartment.categoryId as string),
            orderBy("createdDate")
          );

          const apartmentsCollectionSnapshot = await getDocs(q);

          apartmentsData = mapCollectionToArrayObject(
            apartmentsCollectionSnapshot
          );
        }

        setRelatedList(apartmentsData);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchRelatedList();
  }, [apartment, apartment?.categoryId, apartmentId]);

  useEffect(() => {
    const fetchCurrentApartmentStatus = async () => {
      if (currentUser) {
        try {
          // check if this user is already request for renting before
          const rentalApplicationsCollectionRef = collection(
            db,
            "rentalApplications"
          );

          const q = query(
            rentalApplicationsCollectionRef,
            where("apartmentId", "==", apartmentId as string),
            where("tenantId", "==", currentUser.uid),
            where("status", "in", [
              RentAppStatus.PENDING,
              RentAppStatus.PROCESSING,
              RentAppStatus.RENTING,
            ])
          );

          const apartmentsCollectionSnapshot = await getDocs(q);

          setThisApartmentStatus(
            apartmentsCollectionSnapshot.docs.at(0)?.data().status
          );
        } catch (err: any) {
          console.error(err.message);
        }
      } else return;
    };
    fetchCurrentApartmentStatus();
  }, [apartmentId, currentUser, successfulRent]);

  const handleClickRentBtn = () => {
    if (!currentUser) {
      toast.info("You need to login first", {
        position: "bottom-right",
        style: {
          fontSize: "1.4rem",
        },
      });
      navigate("/login");
      return;
    }
    const fetchDetailCurrentUserData = async () => {
      if (currentUser) {
        const userDocRef = doc(db, `users/${currentUser.uid}`);
        const userDocSnapshot = await getDoc(userDocRef);
        const currentUserInfo = userDocSnapshot.data() as User;

        if (
          !currentUserInfo.email ||
          !currentUserInfo.fullName ||
          !currentUserInfo.phoneNumber ||
          !currentUserInfo.yearOfBirth
        ) {
          setIsModalClose(false);
        } else {
          const oneYear = 365 * 24 * 60 * 60 * 1000;
          const rentalApplicationDocRef = collection(db, "rentalApplications");
          const rentalApplicationData: RentalApplication = {
            apartmentId: apartmentId,
            createdDate: Timestamp.now(),
            startDate: Timestamp.now(),
            // Convert endDate to Timestamp
            endDate: Timestamp.fromMillis(
              Timestamp.now().toDate().getTime() +
                (apartment?.contractDuration as number) * oneYear
            ),
            pricePerMoAtRentalTime: apartment?.pricePerMonth as number,
            depositMoneyAtRentalTime: apartment?.depositMoney as number,
            note: "",
            status: RentAppStatus.PENDING,
            tenantId: currentUser.uid,
          };

          try {
            if (!apartment?.rented && !thisApartmentStatus) {
              const addedData = await addDoc(
                rentalApplicationDocRef,
                rentalApplicationData
              );
              if (addedData.id) {
                setSuccessfulRent(true);
              }
            }
          } catch (err: any) {
            console.error(err.message);
          }
        }
      } else return;
    };

    fetchDetailCurrentUserData();
  };

  const handleCloseModalRemindUpdateProfile = (): void => {
    setIsModalClose(true);
  };
  function handleHideAllReviews(): void {
    setShowedReviews((prev) => [...prev.slice(0, 3)]);
  }
  return (
    <main className="apartment-details-page">
      {loadedPromises < 1 && <FullLoadingScreen />}
      {!isModalClose && (
        <ModalBackToPersonalInfo
          onClose={handleCloseModalRemindUpdateProfile}
        />
      )}
      {successfulRent && (
        <SuccessRentModal onClose={() => setSuccessfulRent(false)} />
      )}
      {loadedPromises >= 1 && (
        <div className="apartment-details">
          <div className="apartment-details__info">
            <div className="text-info">
              <h3 className="name">{apartment?.name}</h3>
              <p className="address">
                <strong>Address:</strong> {apartment?.detailedAddress}
              </p>
              <p className="created-date">
                <strong>Posted date:</strong>{" "}
                {secondsToDateTime(apartment?.createdDate?.seconds as number)}
              </p>
              <p className="amenities">
                <span>
                  {apartment?.beds}{" "}
                  {(apartment?.beds as number) > 1 ? "beds" : "bed"}
                </span>
                <span>
                  {apartment?.baths}{" "}
                  {(apartment?.baths as number) > 1 ? "baths" : "bath"}
                </span>
                <span>{apartment?.area} sqm</span>
              </p>
            </div>
            <div className="action-and-price">
              <p className="action">
                {like ? (
                  <AiFillHeart
                    onClick={handleDislikeThisApartment}
                    className="icon "
                    style={{ color: "#eb6753" }}
                  />
                ) : (
                  <AiOutlineHeart
                    className="icon"
                    onClick={handleLikeThisApartment}
                  />
                )}
              </p>
              <h3 className="price">
                {apartment && formatter.format(apartment.pricePerMonth)}
                <em>/month</em>
              </h3>
              {apartment?.rented ? (
                <p>rented</p>
              ) : thisApartmentStatus ? (
                <p>{thisApartmentStatus}</p>
              ) : (
                <button onClick={handleClickRentBtn} className="rent-btn">
                  Ask for Rent
                </button>
              )}
            </div>
          </div>

          {/* images showing */}
          <ImagesShow images={apartment?.images as string[]} />

          {/* property description */}
          <PropertyDescription apartment={apartment as Apartment} />
          {/* comments section */}
          <CommentsSection
            onHideAllReviews={handleHideAllReviews}
            showedReviews={showedReviews}
            filterStarsComments={filterStarsComments}
            onChangeFilterStarsComment={setFilterStarsComments}
            setToggleRefetchReviews={setToggleRefetchReviews}
            apartment={apartment}
            onShowMore={handleShowMore}
            totalReviews={totalReviews}
            reviews={reviews}
          />

          {relatedList.length > 0 && <Related relatedList={relatedList} />}
        </div>
      )}
    </main>
  );
};

export default ApartmentDetails;
