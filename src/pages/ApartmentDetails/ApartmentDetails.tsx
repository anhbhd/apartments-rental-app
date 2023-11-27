import { useEffect, useState } from "react";

import "./ApartmentDetails.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ImagesShow from "../../components/ApartmentDetails/ImagesShow/ImagesShow";

import PropertyDescription from "../../components/ApartmentDetails/PropertyDescription/PropertyDescription";
import CommentsSection from "../../components/ApartmentDetails/CommentSection/CommentsSection";
import Related from "../../components/ApartmentDetails/Related/Related";
import { useLocation } from "react-router-dom";
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

const ApartmentDetails = () => {
  const { pathname } = useLocation();
  const [apartment, setApartment] = useState<Apartment>();
  const [relatedList, setRelatedList] = useState<Apartment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
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
  const apartmentId = pathname.split("/").pop() as string;
  // console.log(toggleRefetchReviews);
  useEffect(() => {
    // try to fetch a record in wishlist if the record contain this item id and the user id exist
    const fetchLikeStateOfUserToThisItem = async () => {
      if (currentUser) {
        try {
          const wishlistcollectionRef = collection(db, "wishlist");
          const q = query(
            wishlistcollectionRef,
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
    setLike(false);
    await deleteDoc(doc(db, "wishlist", wishlistItemId as string));
  };
  const handleLikeThisApartment = async () => {
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
      const apartmentDocRef = doc(db, `apartments/${apartmentId}`);
      const apartmentSnapshot = await getDoc(apartmentDocRef);
      const apartmentData = apartmentSnapshot.data();

      setApartment({
        ...(apartmentData as Apartment),
        id: apartmentId as string,
      });
      setLoadedPromises((prevNumState) => prevNumState + 1);
    };
    fetchThisApartment();
  }, [apartmentId]);

  // fetch reviews data for this apartment

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollectionRef = collection(db, "reviews");

      let baseQuery = query(
        reviewsCollectionRef,
        where("apartmentId", "==", apartmentId),
        orderBy("createdDate", "desc")
      );

      const totalReviews = (await getDocs(baseQuery)).size;
      setTotalReviews(totalReviews);

      baseQuery = query(baseQuery, limit(reviewsNumPerFetch));
      const reviewsData: Review[] = [];
      const fetchedReviewsCollectionSnapshot = await getDocs(query(baseQuery));

      setLastDoc(
        fetchedReviewsCollectionSnapshot.docs[
          fetchedReviewsCollectionSnapshot.docs.length - 1
        ]
      );
      fetchedReviewsCollectionSnapshot.docs.forEach((doc) => {
        reviewsData.push({
          ...(doc.data() as Review),
          id: doc.id,
        });
      });

      setReviews(reviewsData);
    };
    fetchReviews();
  }, [apartmentId, toggleRefetchReviews]);

  // todo handle show more than three first review

  const handleShowmore = () => {
    if (reviews.length < totalReviews) {
      try {
        const fetchNextThreeReviews = async () => {
          const reviewsCollectionRef = collection(db, "reviews");

          let baseQuery = query(
            reviewsCollectionRef,
            where("apartmentId", "==", apartmentId),

            orderBy("createdDate", "desc")
          );

          const totalReviews = (await getDocs(baseQuery)).size;
          setTotalReviews(totalReviews);

          baseQuery = query(baseQuery, limit(reviewsNumPerFetch));
          baseQuery = query(baseQuery, startAfter(lastDoc));
          const reviewsData: Review[] = [];
          const fetchedReviewsCollectionSnapshot = await getDocs(
            query(baseQuery)
          );

          setLastDoc(
            fetchedReviewsCollectionSnapshot.docs[
              fetchedReviewsCollectionSnapshot.docs.length - 1
            ]
          );
          fetchedReviewsCollectionSnapshot.docs.forEach((doc) => {
            reviewsData.push({
              ...(doc.data() as Review),
              id: doc.id,
            });
          });

          setReviews([...reviews, ...reviewsData]);
        };
        fetchNextThreeReviews();
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };

  //todo fetch related apartment (have the same category :)) )

  useEffect(() => {
    const fetchRelatedList = async () => {
      const data: Apartment[] = [];
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

          apartmentsCollectionSnapshot.docs.forEach((doc) => {
            if (doc.id !== apartmentId) {
              data.push({
                ...(doc.data() as Apartment),
                id: doc.id as string,
              });
            }
          });
        }

        setRelatedList(data);
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

  // console.log(thisApartmentStatus);

  const handleClickRentBtn = () => {
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
          const rentalAplicationDocRef = collection(db, "rentalApplications");
          const rentalApplicationData: RentalApplication = {
            apartmentId: apartmentId,
            createdDate: Timestamp.now(),
            startDate: Timestamp.now(),
            // Convert endDate to Timestamp
            endDate: Timestamp.fromMillis(
              Timestamp.now().toDate().getTime() +
                (apartment?.contractDuration as number) * oneYear
            ),
            note: "",
            status: RentAppStatus.PENDING,
            tenantId: currentUser.uid,
          };

          try {
            if (!apartment?.rented && !thisApartmentStatus) {
              const addedData = await addDoc(
                rentalAplicationDocRef,
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

  return (
    <main className="apartment-details-page">
      {loadedPromises < 2 && <FullLoadingScreen />}
      {!isModalClose && (
        <ModalBackToPersonalInfo
          onClose={handleCloseModalRemindUpdateProfile}
        />
      )}
      {successfulRent && (
        <SuccessRentModal onClose={() => setSuccessfulRent(false)} />
      )}
      {loadedPromises >= 2 && (
        <div className="apartment-details">
          <div className="apartment-details__info">
            <div className="text-info">
              <h3 className="name">{apartment?.name}</h3>
              <p className="address">
                <strong>Address:</strong> {apartment?.detailedAddress}
              </p>
              <p className="created-date">
                <strong>Posted date:</strong>{" "}
                {secondsToDateTime(
                  apartment?.createdDate?.seconds as number
                ).toDateString()}
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
            setToggleRefetchReviews={setToggleRefetchReviews}
            apartment={apartment}
            onShowMore={handleShowmore}
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
