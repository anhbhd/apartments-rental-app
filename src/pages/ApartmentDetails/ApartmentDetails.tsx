import React, { useEffect, useState } from "react";

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
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { Apartment } from "../../type/Apartment";
import { formatter } from "./../../utils/FormatMoney";
import { secondsToDateTime } from "../../utils/SecondToDate";
import { Amenity } from "../../type/Amenity";
import { Review } from "../../type/Review";
import { useAuth } from "../../context/AuthContext";
import ModalBackToPersonalInfo from "../../components/ApartmentDetails/ModalBackToPersonalInfo/ModalBackToPersonalInfo";
import { User } from "../../type/User";
import { RentalApplication } from "../../type/RentalApplication";
import { RentAppStatus } from "../../common/constants/RentalAppStatus";
import SuccessRentModal from "../../components/ApartmentDetails/SuccessRentModal/SuccessRentModal";

const ApartmentDetails = () => {
  const { pathname } = useLocation();
  const [apartment, setApartment] = useState<Apartment>();
  const [amenities, setAmenities] = useState<Amenity[] | null>(null);
  const [relatedList, setRelatedList] = useState<Apartment[]>([]);
  // const [reviews, setReviews] = useState<Review[]>([]);
  const [numOfReviews, setNumOfReviews] = useState<number>(3);
  // const [totalReviews, setTotalReviews] = useState<number>(0);

  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);
  const [like, setLike] = useState<boolean>(false);

  const [isModalClose, setIsModalClose] = useState<boolean>(true);
  const [successfulRent, setSuccessfulRent] = useState<boolean>(false);
  const [thisApartmentStatus, setThisApartmentStatus] = useState<string>("");
  const { currentUser } = useAuth();

  const apartmentId = pathname.split("/").pop() as string;

  // f1
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
          // console.log(wishlistCollectionSnapshot.docs.at(0)?.data());
          const fetchedWishlistItemId =
            wishlistCollectionSnapshot.docs.at(0)?.id;
          // console.log(wishlistCollectionSnapshot.docs.at(0)?.id);
          if (fetchedWishlistItemId) {
            setLike(true);
            setWishlistItemId(fetchedWishlistItemId);
          }
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
      const newDoc = await addDoc(collection(db, "wishlist"), {
        userId: currentUser.uid,
        createdDate: Timestamp.now(),
        apartmentId: apartmentId,
      });
      console.log(newDoc);
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
    };
    fetchThisApartment();
  }, [apartmentId]);

  useEffect(() => {
    const fetchAmenities = async (apartmentId: string) => {
      const amenitiesCollectionRef = collection(db, "amenities");
      const amenities: Amenity[] = [];
      try {
        const baseQuery = query(
          amenitiesCollectionRef,
          where("apartmentId", "==", apartmentId)
        );
        const amenitiesCollectionSnapshot = await getDocs(baseQuery);

        amenitiesCollectionSnapshot.docs.forEach((doc) => {
          const item = doc.data() as Amenity;
          amenities.push({
            ...item,
            id: doc.id as string,
          });
        });
      } catch (err: any) {
        console.log(err);
      }
      setAmenities(amenities);
    };
    fetchAmenities(apartmentId);
  }, [apartmentId]);

  // fetch reviews data for this apartment

  useEffect(() => {
    const fetchReviews = async (numOfReviews: number) => {
      const reviewsCollectionRef = collection(db, "reviews");

      const baseQuery = query(
        reviewsCollectionRef,
        where("apartmentId", "==", apartmentId),
        limit(numOfReviews),
        orderBy("createdDate", "desc")
      );

      const fetchedReviewsCollectionSnapshot = await getDocs(query(baseQuery));

      fetchedReviewsCollectionSnapshot.docs.forEach((doc) => {
        console.log(doc.data());
      });
    };
    fetchReviews(numOfReviews);
  }, [apartmentId, numOfReviews]);

  //fetch related apartment (have the same category :)) )

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

  const handleCloseModalRemindUpdateProfile = () => {
    setIsModalClose(true);
  };

  return (
    <main className="apartment-details-page">
      {!isModalClose && (
        <ModalBackToPersonalInfo
          onClose={handleCloseModalRemindUpdateProfile}
        />
      )}
      {successfulRent && (
        <SuccessRentModal onClose={() => setSuccessfulRent(false)} />
      )}
      <div className="apartment-details">
        <div className="apartment-details__info">
          <div className="text-info">
            <h3 className="name">{apartment?.name}</h3>
            <p className="address">
              {" "}
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
        <PropertyDescription
          amenities={amenities as Amenity[]}
          apartment={apartment as Apartment}
        />
        {/* comments section */}
        <CommentsSection />

        {relatedList.length > 0 && <Related relatedList={relatedList} />}
      </div>
    </main>
  );
};

export default ApartmentDetails;
