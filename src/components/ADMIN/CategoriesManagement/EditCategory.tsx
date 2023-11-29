import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { addDocument } from "../../../services/addDocs";
import { Category } from "../../../type/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import { getDocument } from "../../../services/getDocument";

interface IAddCategoryProps {
  category: Category;
  onSetCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  categories: Category[];
}

const EditCategory: React.FC<IAddCategoryProps> = ({
  category,
  onSetCategories,
  categories,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryName, setCategoryName] = useState<string>(category.name);

  const showModal = () => {
    setOpen(true);
  };

  const handleChangeNameCategory = async () => {
    // Check if the lowercase category name already exists in the array
    if (
      categories?.some(
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

  // display old name
  const fetchCategory = async (categoryId: string) => {
    const categoryData: Category = await getDocument("categories", categoryId);
    setCategoryName(categoryData.name);
  };
  useEffect(() => {
    if (category.id) {
      fetchCategory(category.id);
    }
  }, [category.id]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit category"
        open={open}
        onOk={() => handleChangeNameCategory()}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Input
            placeholder="enter new name"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditCategory;
