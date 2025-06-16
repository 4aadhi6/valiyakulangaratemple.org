// frontend/components/admin/AdminGalleryManager.tsx

import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Language, GalleryImage } from "../../types";
import * as templeDataService from "../../services/templeDataService";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

const AdminGalleryManager: React.FC = () => {
  const { templeData, fetchTempleData, language, isLoadingData } =
    useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<Partial<GalleryImage>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const openModalForNew = () => {
    setCurrentImage({ description: "", descriptionMalayalam: "" });
    setSelectedFile(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingImageId(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (image: GalleryImage) => {
    setCurrentImage({ ...image });
    setSelectedFile(null);
    setImagePreview(image.url); // Show existing image
    setIsEditing(true);
    setEditingImageId(image.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentImage((prev: Partial<GalleryImage>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(currentImage.url || null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = new FormData();
    formData.append("description", currentImage.description || "");
    formData.append(
      "descriptionMalayalam",
      currentImage.descriptionMalayalam || ""
    );

    if (selectedFile) {
      formData.append("imageFile", selectedFile);
    }

    try {
      if (isEditing && editingImageId) {
        await templeDataService.updateGalleryImage(editingImageId, formData);
      } else {
        if (!selectedFile && !currentImage.url) {
          alert(
            language === Language.EN
              ? "Please select an image file to upload or provide an image URL."
              : "ദയവായി അപ്‌ലോഡ് ചെയ്യാൻ ഒരു ചിത്രം തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ ഒരു ചിത്രത്തിൻ്റെ URL നൽകുക."
          );
          setFormLoading(false);
          return;
        }
        if (!selectedFile && currentImage.url) {
          formData.append("url", currentImage.url);
        }
        await templeDataService.addGalleryImage(formData);
      }

      await fetchTempleData();
      closeModal();
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Failed to save image:", error);
      alert(
        language === Language.EN
          ? `Failed to save image: ${errMessage}`
          : `ചിത്രം സംരക്ഷിക്കുന്നതിൽ പരാജയപ്പെട്ടു: ${errMessage}`
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        language === Language.EN
          ? "Are you sure you want to delete this image?"
          : "ഈ ചിത്രം ഇല്ലാതാക്കാൻ നിങ്ങൾക്ക് ഉറപ്പുണ്ടോ?"
      )
    ) {
      setFormLoading(true);
      try {
        await templeDataService.deleteGalleryImage(id);
        await fetchTempleData();
      } catch (error) {
        console.error("Failed to delete image:", error);
        alert(
          language === Language.EN
            ? "Failed to delete image."
            : "ചിത്രം ഇല്ലാതാക്കുന്നതിൽ പരാജയപ്പെട്ടു."
        );
      } finally {
        setFormLoading(false);
      }
    }
  };

  const inputClass =
    "w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white text-sm";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  if (isLoadingData && templeData.galleryImages.length === 0) {
    return (
      <p>
        {language === Language.EN
          ? "Loading gallery..."
          : "ഗാലറി ലോഡ് ചെയ്യുന്നു..."}
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {language === Language.EN
            ? "Manage Gallery"
            : "ഗാലറി കൈകാര്യം ചെയ്യുക"}
        </h3>
        <button
          onClick={openModalForNew}
          disabled={formLoading}
          className="flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          {language === Language.EN ? "Add Image" : "ചിത്രം ചേർക്കുക"}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {templeData.galleryImages.map((image: GalleryImage) => (
          <div
            key={image.id}
            className="relative group border dark:border-gray-700 rounded-lg overflow-hidden shadow-md aspect-square"
          >
            <img
              src={image.url}
              alt={
                language === Language.EN
                  ? image.description
                  : image.descriptionMalayalam
              }
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs truncate">
                {language === Language.EN
                  ? image.description
                  : image.descriptionMalayalam}
              </p>
              <div className="flex justify-end space-x-1 mt-1">
                <button
                  onClick={() => openModalForEdit(image)}
                  disabled={formLoading}
                  className="p-1 bg-blue-500/70 hover:bg-blue-600/70 rounded disabled:opacity-50"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  disabled={formLoading}
                  className="p-1 bg-red-500/70 hover:bg-red-600/70 rounded disabled:opacity-50"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {templeData.galleryImages.length === 0 && !isLoadingData && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-4">
            {language === Language.EN
              ? "No images in gallery yet."
              : "ഗാലറിയിൽ ചിത്രങ്ങളൊന്നും ചേർത്തിട്ടില്ല."}
          </p>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {isEditing
                ? language === Language.EN
                  ? "Edit Image"
                  : "ചിത്രം തിരുത്തുക"
                : language === Language.EN
                ? "Add New Image"
                : "പുതിയ ചിത്രം ചേർക്കുക"}
            </h4>

            <div>
              <label htmlFor="imageFile" className={labelClass}>
                {language === Language.EN ? "Image File" : "ചിത്രം ഫയൽ"}
              </label>
              {isEditing && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {language === Language.EN
                    ? "Upload a new file to replace the existing one."
                    : "നിലവിലുള്ള ചിത്രം മാറ്റാൻ പുതിയ ഫയൽ അപ്‌ലോഡ് ചെയ്യുക."}
                </p>
              )}
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-24 w-auto rounded"
                    />
                  ) : (
                    <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="imageFile"
                      className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-orange-600 dark:text-orange-400 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800 focus-within:ring-orange-500"
                    >
                      <span>
                        {language === Language.EN
                          ? "Upload a file"
                          : "ഒരു ഫയൽ അപ്‌ലോഡ് ചെയ്യുക"}
                      </span>
                      <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/*"
                        disabled={formLoading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {language === Language.EN
                      ? "PNG, JPG, GIF up to 10MB"
                      : "PNG, JPG, GIF, 10MB വരെ"}
                  </p>
                </div>
              </div>
            </div>

            {!isEditing && (
              <div>
                <label htmlFor="url" className={labelClass}>
                  {language === Language.EN
                    ? "Or Image URL"
                    : "അല്ലെങ്കിൽ ചിത്രത്തിന്റെ URL"}
                </label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  value={currentImage.url || ""}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://example.com/image.jpg"
                  disabled={formLoading || !!selectedFile}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {language === Language.EN
                    ? "Provide URL if not uploading a file."
                    : "ഒരു ഫയൽ അപ്‌ലോഡ് ചെയ്യുന്നില്ലെങ്കിൽ URL നൽകുക."}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="description" className={labelClass}>
                {language === Language.EN
                  ? "Description (English)"
                  : "വിവരണം (ഇംഗ്ലീഷ്)"}
              </label>
              <textarea
                name="description"
                id="description"
                value={currentImage.description || ""}
                onChange={handleChange}
                rows={2}
                className={inputClass}
                disabled={formLoading}
              />
            </div>
            <div>
              <label htmlFor="descriptionMalayalam" className={labelClass}>
                {language === Language.EN
                  ? "Description (Malayalam)"
                  : "വിവരണം (മലയാളം)"}
              </label>
              <textarea
                name="descriptionMalayalam"
                id="descriptionMalayalam"
                value={currentImage.descriptionMalayalam || ""}
                onChange={handleChange}
                rows={2}
                className={inputClass}
                disabled={formLoading}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                disabled={formLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                {language === Language.EN ? "Cancel" : "റദ്ദാക്കുക"}
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {formLoading
                  ? language === Language.EN
                    ? "Saving..."
                    : "സേവ് ചെയ്യുന്നു..."
                  : language === Language.EN
                  ? isEditing
                    ? "Save Changes"
                    : "Add Image"
                  : isEditing
                  ? "മാറ്റങ്ങൾ സംരക്ഷിക്കുക"
                  : "ചിത്രം ചേർക്കുക"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminGalleryManager;
