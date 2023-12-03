import { Button, Modal } from "antd";
import React from "react";
import { Category } from "../../../Type/Category";
import { deleteDocument } from "../../../services/deleteDocument";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import EditCategory from "./EditCategory";
import { toast } from "react-toastify";

interface IActionsProps {
  category: Category;
  onDeleteCategory: (categoryId: string) => void;
  onSetCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  categories: Category[];
}
const Actions: React.FC<IActionsProps> = ({
  category,
  onDeleteCategory,
  onSetCategories,
  categories,
}) => {
  const checkIfAnyApartmentBelongToThisCategory = async () => {
    const ApartmentsREF = collection(db, "apartments");
    const q = query(ApartmentsREF, where("categoryId", "==", category.id));
    const apartmentsSnapshot = await getDocs(q);
    return apartmentsSnapshot.docs.length > 0;
  };

  const handleDeleteACategory = async () => {
    try {
      if (await checkIfAnyApartmentBelongToThisCategory()) {
        throw Error(
          "Some apartments belong to this category, You cannot delete it!"
        );
      } else {
        await deleteDocument("categories", category.id);
        onDeleteCategory(category.id);
        toast.success("Delete category successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (err: any) {
      toast.error(err.message, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex gap-5">
      <Button
        type="primary"
        danger
        onClick={() => {
          Modal.confirm({
            title: "Are you sure to delete this category",
            content: "You category is going to be deleted forever!",
            onOk: () => handleDeleteACategory(),
            okText: "Delete",
            okButtonProps: { danger: true },
            footer: (_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            ),
          });
        }}
      >
        Delete
      </Button>

      <EditCategory
        onSetCategories={onSetCategories}
        categories={categories}
        category={category}
      />
    </div>
  );
};

export default Actions;
