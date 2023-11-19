import React, { useEffect, useState } from "react";

import "./ApartmentDetails.scss";
import { AiOutlineHeart } from "react-icons/ai";
import ImagesShow from "../../components/ApartmentDetails/ImagesShow/ImagesShow";

import PropertyDescription from "../../components/ApartmentDetails/PropertyDescription/PropertyDescription";
import CommentsSection from "../../components/ApartmentDetails/CommentSection/CommentsSection";
import Related from "../../components/ApartmentDetails/Related/Related";
import { useLocation } from "react-router-dom";
import {
  collection,
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

const ApartmentDetails = () => {
  const { pathname } = useLocation();
  const [apartment, setApartment] = useState<Apartment>();
  const [amenities, setAmenities] = useState<Amenity[] | null>(null);
  const [relatedList, setRelatedList] = useState<Apartment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [numOfReviews, setNumOfReviews] = useState<number>(3);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  const apartmentId = pathname.split("/").pop() as string;

  // get the apartment doc

  useEffect(() => {
    const getApartment = async () => {
      const apartmentDocRef = doc(db, `apartments/${apartmentId}`);
      const apartmentSnapshot = await getDoc(apartmentDocRef);
      const apartmentData = apartmentSnapshot.data();

      setApartment({
        ...(apartmentData as Apartment),
        id: apartmentId as string,
      });
    };
    getApartment();
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
  }, []);

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
  }, [numOfReviews]);

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
  }, [apartment?.categoryId, apartmentId]);

  return (
    <main className="apartment-details-page">
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
                apartment?.createdDate.seconds as number
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
              <AiOutlineHeart className="icon " />
              {/* <AiFillHeart className="icon " style={{ color: "#eb6753" }} /> */}
            </p>
            <h3 className="price">
              {apartment && formatter.format(apartment.pricePerMonth)}
              <em>/month</em>
            </h3>
            <button className="rent-btn">Ask for Rent</button>
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
