import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { addDocument } from "../../../services/addDocs";
import { Category } from "../../../type/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase_config";

interface IAddCategoryProps {
  categories: Category[];
  onSetCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  onSetError: React.Dispatch<React.SetStateAction<string>>;
}

const AddNewCategory: React.FC<IAddCategoryProps> = ({
  categories,
  onSetCategories,
  onSetError,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");

  const showModal = () => {
    setOpen(true);
  };

  const handleAddNewCategory = async () => {
    // Check if the lowercase category name already exists in the array
    if (
      categories.some(
        (category) => category.name.toLowerCase() === categoryName.toLowerCase()
      ) ||
      !categoryName
    ) {
      console.error(
        "This category name already exists. Please choose a different name."
      );
      return;
    }

    setConfirmLoading(true);

    try {
      await addDocument("categories", { name: categoryName });
      const categoryRef = collection(db, "categories");
      let q = query(categoryRef, where("name", "==", categoryName));

      const categoriesData = await getDocs(q);
      const newCategory = categoriesData.docs.at(0);
      // Assuming you want to update the categories state after a successful addition
      onSetCategories((prevCategories) => [
        ...prevCategories,
        { id: newCategory?.id, name: newCategory?.data().name } as Category,
      ]);
    } catch (err: any) {
      console.error(err);
    } finally {
      setOpen(false);
      setConfirmLoading(false);
      setCategoryName("");
    }
  };

  // edit part
  //   const fetchCategory = async (categoryId: string) => {
  //     const categoryData: Category = await getDocument("categories", categoryId);
  //     setCategoryName(categoryData.name);
  //   };
  //   useEffect(() => {
  //     if (categoryIdForEdit) {
  //       fetchCategory(categoryIdForEdit);
  //     }
  //   }, [categoryIdForEdit]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new category
      </Button>
      <Modal
        title="Add new category"
        open={open}
        onOk={handleAddNewCategory}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Input
            placeholder="enter category name"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddNewCategory;
