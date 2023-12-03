import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { Category } from "../../../Type/Category";
import { getDocument } from "../../../services/getDocument";
import { updateDocument } from "../../../services/updateDocument";
import { toast } from "react-toastify";

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
      toast.error(
        "This category name already exists. Please choose a different name",
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
      return;
    }

    setConfirmLoading(true);

    try {
      await updateDocument("categories", category.id, { name: categoryName });

      // Assuming you want to update the categories state after a successful addition
      onSetCategories((prevCategories) =>
        prevCategories.map((c) =>
          c.id === category.id ? { ...c, name: categoryName } : c
        )
      );
      toast.success("Edit category successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err: any) {
      toast.error(err.message, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setOpen(false);
      setConfirmLoading(false);
      setCategoryName(categoryName);
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
