import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Chip,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "../config/AxiosInterceptor";
import { toast } from "react-toastify";

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [updatePropertyData, setUpdatePropertyData] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [addPreviews, setAddPreviews] = useState([]);
  const [updatePreviews, setUpdatePreviews] = useState([]);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  // ------------------ FETCH ------------------
  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`/api/v1/properties`);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const fetchMyProperties = async () => {
    try {
      const response = await axios.get(`/api/v1/properties/user/${userId}`);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  // ------------------ DIALOG OPEN/CLOSE ------------------
  const handleOpenAdd = () => {
    setAddPreviews([]);
    setOpenAdd(true);
  };
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setUpdatePropertyData(undefined);
    setUpdatePreviews([]);
  };

  const handleUpdate = (property) => {
    setUpdatePropertyData(property);
    // build previews from existing image urls if present
    const urls =
      property.images && Array.isArray(property.images)
        ? property.images.map((img) => (typeof img === "string" ? img : img.url || img.path || ""))
        : [];
    setUpdatePreviews(urls);
    setOpenUpdate(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/properties/${id}`);
      toast.success(`Property deleted successfully`);
      fetchMyProperties(); // Refresh list
    } catch (error) {
      toast.error(`Error deleting property:`);
      console.error("Error deleting property:", error);
    }
  };

  // ------------------ VALIDATION ------------------
  const PropertySchema = Yup.object().shape({
    name: Yup.string().required("Property name is required"),
    location: Yup.string().required("Location is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
    builder: Yup.string().required("Builder is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
      .required("Contact is required"),
    discount: Yup.string().required("Discount is required"),
    description: Yup.string().required("Description is required"),
    features: Yup.string().required("Features are required"),
    // propertySpecifications fields optional, but can be validated if needed
  });

  // ------------------ HELPERS TO READ PROP FIELDS SAFELY ------------------
  const getSpecs = (property) =>
    property.propertySpecifications || property.property_specifications || property.specifications || {};
  const getAmenities = (property) => property.amenities || {};

  // ------------------ ADD PROPERTY HANDLER ------------------
  const handleAddProperty = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = new FormData();

      // basic fields
      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("price", values.price);
      formData.append("builder", values.builder);
      formData.append("contact", values.contact);
      formData.append("discount", values.discount);
      formData.append("description", values.description);
      formData.append("features", values.features || "");

      // propertySpecifications (flat keys) - use exactly as your backend expects (propertySpecifications.*)
      formData.append("propertySpecifications.bedrooms", values.propertySpecifications?.bedrooms ?? "");
      formData.append("propertySpecifications.bathrooms", values.propertySpecifications?.bathrooms ?? "");
      formData.append("propertySpecifications.areaSqFt", values.propertySpecifications?.areaSqFt ?? "");

      // amenities (flat keys)
      // backend expects string "true"/"false" in form-data; append boolean values (FormData will cast)
      formData.append("amenities.hasPark", values.amenities?.hasPark ?? false);
      formData.append("amenities.hasSecurity", values.amenities?.hasSecurity ?? false);
      formData.append("amenities.hasVisitorParking", values.amenities?.hasVisitorParking ?? false);
      formData.append("amenities.hasTerraceGarden", values.amenities?.hasTerraceGarden ?? false);

      // Append all selected files
      if (values.images && values.images.length > 0) {
        for (let i = 0; i < values.images.length; i++) {
          formData.append("images", values.images[i]);
        }
      }

      await axios.post(`/api/v1/properties`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchProperties(); // Refresh list
      resetForm();
      handleCloseAdd();
      toast.success(`Property added successfully`);
    } catch (error) {
      toast.error(`Error adding property`);
      console.error("Error adding property:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // ------------------ UPDATE PROPERTY HANDLER ------------------
  const handleUpdateProperty = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("price", values.price);
      formData.append("builder", values.builder);
      formData.append("contact", values.contact);
      formData.append("discount", values.discount);
      formData.append("description", values.description);
      formData.append("features", values.features || "");

      // specs
      formData.append("propertySpecifications.bedrooms", values.propertySpecifications?.bedrooms ?? "");
      formData.append("propertySpecifications.bathrooms", values.propertySpecifications?.bathrooms ?? "");
      formData.append("propertySpecifications.areaSqFt", values.propertySpecifications?.areaSqFt ?? "");

      // amenities
      formData.append("amenities.hasPark", values.amenities?.hasPark ?? false);
      formData.append("amenities.hasSecurity", values.amenities?.hasSecurity ?? false);
      formData.append("amenities.hasVisitorParking", values.amenities?.hasVisitorParking ?? false);
      formData.append("amenities.hasTerraceGarden", values.amenities?.hasTerraceGarden ?? false);

      // images (if new)
      if (values.images && values.images.length > 0) {
        for (let i = 0; i < values.images.length; i++) {
          formData.append("images", values.images[i]);
        }
      }

      // pick id from either _id or id
      const id = updatePropertyData?._id || updatePropertyData?.id;
      await axios.put(`/api/v1/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchProperties(); // Refresh list
      resetForm();
      toast.success(`Property updated successfully`);
    } catch (error) {
      toast.error(`Error updating property`);
      console.error("Error updating property:", error);
    } finally {
      setSubmitting(false);
      handleCloseUpdate();
    }
  };

  // ------------------ RENDER ------------------
  return (
    <Card
      sx={{
        maxWidth: 1200,
        width: "95%",
        mx: "auto",
        opacity: 0.8,
        borderRadius: "29px",
        boxShadow: "0px 8px 4px 0px rgba(0, 0, 0, 0.25)",
        background: "linear-gradient(135deg, #632F97 0%, #7B3F9A 50%, #8B4FA8 100%)",
        color: "white",
        overflow: "hidden",
        position: "relative",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        mb: 4,
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #fff, #e0e7ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Property Management
          </Typography>
          <Button
            onClick={handleOpenAdd}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "25px",
              background: "linear-gradient(90deg, #98CDFF 0%, #E6AFFF 100%)",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 8px 20px rgba(152, 205, 255, 0.35)",
              border: "2px solid rgba(255,255,255,0.2)",
              "&:hover": {
                background: "linear-gradient(90deg, #E6AFFF 0%, #98CDFF 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 25px rgba(152, 205, 255, 0.5)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Add Property
          </Button>
        </Box>

        {/* Table */}
        <TableContainer
          sx={{
            background: "transparent",
            borderRadius: 3,
            overflow: "auto",
            maxHeight: { xs: "50vh", md: "65vh" },
            pr: 1,
            "&::-webkit-scrollbar": { width: 6, height: 6 },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(255,255,255,0.35)", borderRadius: 8 },
            "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "rgba(255,255,255,0.5)" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["Property Name", "Location", "Price", "Builder", "Contact", "Discount", "Images", "Actions"].map(
                  (head) => (
                    <TableCell
                      key={head}
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                        borderBottom: "2px solid rgba(255,255,255,0.2)",
                        fontSize: "1rem",
                        py: 2,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {properties.map((property, index) => {
                const specs = getSpecs(property);
                const amns = getAmenities(property);
                return (
                  <TableRow
                    key={property._id || property.id || index}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.08)", transform: "scale(1.01)" },
                      transition: "all 0.3s ease",
                      background: index % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                    }}
                  >
                    <TableCell sx={{ color: "white", py: 2, fontSize: "0.95rem" }}>{property.name}</TableCell>
                    <TableCell sx={{ color: "white", py: 2, fontSize: "0.95rem" }}>{property.location}</TableCell>
                    <TableCell sx={{ color: "white", py: 2, fontSize: "0.95rem" }}>{property.price}</TableCell>
                    <TableCell sx={{ color: "white", py: 2, fontSize: "0.95rem" }}>{property.builder}</TableCell>
                    <TableCell sx={{ color: "white", py: 2, fontSize: "0.95rem" }}>{property.contact}</TableCell>
                    <TableCell sx={{ color: "white", py: 2, fontSize: "0.95rem" }}>{property.discount}</TableCell>

                    {/* Images */}
                    <TableCell sx={{ py: 2 }}>
                      {property.images && property.images.length > 0 ? (
                        <Button
                          size="small"
                          sx={{
                            borderRadius: "20px",
                            px: 3,
                            py: 1,
                            background: "linear-gradient(90deg, #98CDFF 0%, #E6AFFF 100%)",
                            color: "#0b2239",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "0.85rem",
                            boxShadow: "0 4px 15px rgba(152, 205, 255, 0.3)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            "&:hover": { background: "linear-gradient(90deg, #E6AFFF 0%, #98CDFF 100%)", transform: "translateY(-1px)", boxShadow: "0 6px 20px rgba(152, 205, 255, 0.45)" },
                            transition: "all 0.3s ease",
                          }}
                          onClick={() => {
                            const first = property.images[0];
                            const url = typeof first === "string" ? first : first.url || first.path || "";
                            if (url) window.open(url, "_blank");
                            else toast.info("No valid image url");
                          }}
                        >
                          Image
                        </Button>
                      ) : (
                        <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>No images</Typography>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Button
                          size="small"
                          sx={{
                            borderRadius: "20px",
                            px: 3,
                            py: 1,
                            background: "linear-gradient(90deg, #98CDFF 0%, #E6AFFF 100%)",
                            color: "#0b2239",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "0.85rem",
                            boxShadow: "0 4px 15px rgba(152, 205, 255, 0.3)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            "&:hover": { background: "linear-gradient(90deg, #E6AFFF 0%, #98CDFF 100%)", transform: "translateY(-1px)", boxShadow: "0 6px 20px rgba(152, 205, 255, 0.45)" },
                            transition: "all 0.3s ease",
                          }}
                          onClick={() => handleUpdate(property)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          sx={{
                            borderRadius: "20px",
                            px: 3,
                            py: 1,
                            background: "linear-gradient(90deg, #98CDFF 0%, #E6AFFF 100%)",
                            color: "#0b2239",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "0.85rem",
                            boxShadow: "0 4px 15px rgba(152, 205, 255, 0.3)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            "&:hover": { background: "linear-gradient(90deg, #E6AFFF 0%, #98CDFF 100%)", transform: "translateY(-1px)", boxShadow: "0 6px 20px rgba(152, 205, 255, 0.45)" },
                            transition: "all 0.3s ease",
                          }}
                          onClick={() => handleDelete(property._id || property.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* ------------------ ADD PROPERTY DIALOG ------------------ */}
      <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth maxWidth="sm">
        <Box sx={{ backgroundColor: "#E1EFF3" }}>
          <DialogTitle sx={{ fontWeight: "bold" }}>Add New Property</DialogTitle>
          <Formik
            initialValues={{
              name: "",
              location: "",
              price: "",
              builder: "",
              contact: "",
              discount: "",
              description: "",
              features: "",
              images: [],
              // propertySpecifications nested object for UI, but will send flat keys
              propertySpecifications: {
                bedrooms: "",
                bathrooms: "",
                areaSqFt: "",
              },
              amenities: {
                hasPark: false,
                hasSecurity: false,
                hasVisitorParking: false,
                hasTerraceGarden: false,
              },
            }}
            validationSchema={PropertySchema}
            onSubmit={handleAddProperty}
          >
            {({ errors, touched, setFieldValue, isSubmitting, values }) => (
              <Form>
                <DialogContent sx={{ pt: 0 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Field
                      as={TextField}
                      name="name"
                      label="Property Name"
                      fullWidth
                      variant="filled"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />
                    <Field
                      as={TextField}
                      name="location"
                      label="Location"
                      fullWidth
                      variant="filled"
                      error={touched.location && Boolean(errors.location)}
                      helperText={touched.location && errors.location}
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />
                    <Field
                      as={TextField}
                      name="price"
                      label="Price"
                      type="number"
                      fullWidth
                      variant="filled"
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />
                    <Field
                      as={TextField}
                      name="builder"
                      label="Builder"
                      fullWidth
                      variant="filled"
                      error={touched.builder && Boolean(errors.builder)}
                      helperText={touched.builder && errors.builder}
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />
                    <Field
                      as={TextField}
                      name="contact"
                      label="Contact"
                      fullWidth
                      variant="filled"
                      error={touched.contact && Boolean(errors.contact)}
                      helperText={touched.contact && errors.contact}
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />
                    <Field
                      as={TextField}
                      name="discount"
                      label="Discount"
                      fullWidth
                      variant="filled"
                      error={touched.discount && Boolean(errors.discount)}
                      helperText={touched.discount && errors.discount}
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />
                    <Field
                      as={TextField}
                      name="description"
                      label="Description"
                      fullWidth
                      variant="filled"
                      multiline
                      minRows={3}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />
                    <Field
                      as={TextField}
                      name="features"
                      label="Features"
                      fullWidth
                      variant="filled"
                      multiline
                      minRows={2}
                      error={touched.features && Boolean(errors.features)}
                      helperText={touched.features && errors.features}
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />

                    {/* Amenities */}
                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>Amenities</Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.amenities.hasPark}
                            onChange={(e) => setFieldValue("amenities", { ...values.amenities, hasPark: e.target.checked })}
                          />
                        }
                        label="Park"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.amenities.hasSecurity}
                            onChange={(e) => setFieldValue("amenities", { ...values.amenities, hasSecurity: e.target.checked })}
                          />
                        }
                        label="Security"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.amenities.hasVisitorParking}
                            onChange={(e) => setFieldValue("amenities", { ...values.amenities, hasVisitorParking: e.target.checked })}
                          />
                        }
                        label="Visitor Parking"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.amenities.hasTerraceGarden}
                            onChange={(e) => setFieldValue("amenities", { ...values.amenities, hasTerraceGarden: e.target.checked })}
                          />
                        }
                        label="Terrace Garden"
                      />
                    </Box>

                    {/* Property Specifications */}
                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>Property Specifications</Typography>
                    <Field
                      as={TextField}
                      name="propertySpecifications.bedrooms"
                      label="Bedrooms"
                      type="number"
                      fullWidth
                      variant="filled"
                      value={values.propertySpecifications.bedrooms}
                      onChange={(e) =>
                        setFieldValue("propertySpecifications", { ...values.propertySpecifications, bedrooms: e.target.value })
                      }
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />
                    <Field
                      as={TextField}
                      name="propertySpecifications.bathrooms"
                      label="Bathrooms"
                      type="number"
                      fullWidth
                      variant="filled"
                      value={values.propertySpecifications.bathrooms}
                      onChange={(e) =>
                        setFieldValue("propertySpecifications", { ...values.propertySpecifications, bathrooms: e.target.value })
                      }
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />
                    <Field
                      as={TextField}
                      name="propertySpecifications.areaSqFt"
                      label="Area (sqft)"
                      type="number"
                      fullWidth
                      variant="filled"
                      value={values.propertySpecifications.areaSqFt}
                      onChange={(e) =>
                        setFieldValue("propertySpecifications", { ...values.propertySpecifications, areaSqFt: e.target.value })
                      }
                      sx={{ background: "#DEDEDE", borderRadius: 1 }}
                    />

                    <Button component="label" variant="outlined" sx={{ alignSelf: "flex-start" }}>
                      Choose images
                      <input
                        hidden
                        multiple
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                          const files = e.currentTarget.files;
                          setFieldValue("images", files);
                          if (files && files.length > 0) {
                            const urls = Array.from(files).map((f) => URL.createObjectURL(f));
                            setAddPreviews(urls);
                          } else {
                            setAddPreviews([]);
                          }
                        }}
                      />
                    </Button>

                    {addPreviews.length > 0 && (
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Chip label={`${addPreviews.length} image(s) selected`} color="primary" variant="outlined" sx={{ alignSelf: "flex-start" }} />
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          {addPreviews.map((src, idx) => (
                            <Box key={idx} sx={{ width: 72, height: 72, borderRadius: 1, overflow: "hidden", boxShadow: 1, border: "1px solid #e5e7eb", backgroundColor: "#fff" }}>
                              <img src={src} alt={`preview-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3 }}>
                  <Button onClick={handleCloseAdd} sx={{ color: "#000" }}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      px: 3,
                      borderRadius: "12px",
                      background: "linear-gradient(90deg, #98CDFF 0%, #E6AFFF 100%)",
                      color: "#fff",
                      textTransform: "none",
                      "&:hover": { background: "linear-gradient(90deg, #E6AFFF 0%, #98CDFF 100%)" },
                    }}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>

      {/* ------------------ UPDATE PROPERTY DIALOG ------------------ */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate} fullWidth maxWidth="sm">
        <Box sx={{ backgroundColor: "#E1EFF3" }}>
          <DialogTitle sx={{ fontWeight: "bold" }}>Edit Property</DialogTitle>
          {updatePropertyData && (
            <Formik
              initialValues={{
                name: updatePropertyData.name || "",
                location: updatePropertyData.location || "",
                price: updatePropertyData.price || "",
                builder: updatePropertyData.builder || "",
                contact: updatePropertyData.contact || "",
                discount: updatePropertyData.discount || "",
                description: updatePropertyData.description || "",
                features: updatePropertyData.features || "",
                images: [],
                // map existing nested structures if available
                propertySpecifications: {
                  bedrooms:
                    (updatePropertyData.propertySpecifications && updatePropertyData.propertySpecifications.bedrooms) ||
                    updatePropertyData.property_specifications?.bedrooms ||
                    updatePropertyData.specifications?.bedrooms ||
                    "",
                  bathrooms:
                    (updatePropertyData.propertySpecifications && updatePropertyData.propertySpecifications.bathrooms) ||
                    updatePropertyData.property_specifications?.bathrooms ||
                    updatePropertyData.specifications?.bathrooms ||
                    "",
                  areaSqFt:
                    (updatePropertyData.propertySpecifications && updatePropertyData.propertySpecifications.areaSqFt) ||
                    updatePropertyData.property_specifications?.areaSqFt ||
                    updatePropertyData.specifications?.areaSqFt ||
                    "",
                },
                amenities: {
                  hasPark: updatePropertyData.amenities?.hasPark ?? false,
                  hasSecurity: updatePropertyData.amenities?.hasSecurity ?? false,
                  hasVisitorParking: updatePropertyData.amenities?.hasVisitorParking ?? false,
                  hasTerraceGarden: updatePropertyData.amenities?.hasTerraceGarden ?? false,
                },
              }}
              validationSchema={PropertySchema}
              onSubmit={handleUpdateProperty}
              enableReinitialize
            >
              {({ errors, touched, setFieldValue, isSubmitting, values }) => (
                <Form>
                  <DialogContent sx={{ pt: 0 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Field as={TextField} name="name" label="Property Name" fullWidth variant="filled" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} sx={{ background: "#DEDEDE", borderRadius: 1 }} />
                      <Field as={TextField} name="location" label="Location" fullWidth variant="filled" error={touched.location && Boolean(errors.location)} helperText={touched.location && errors.location} sx={{ background: "#DEDEDE", borderRadius: 1 }} />
                      <Field as={TextField} name="price" label="Price" type="number" fullWidth variant="filled" error={touched.price && Boolean(errors.price)} helperText={touched.price && errors.price} sx={{ background: "#DEDEDE", borderRadius: 1 }} />
                      <Field as={TextField} name="builder" label="Builder" fullWidth variant="filled" error={touched.builder && Boolean(errors.builder)} helperText={touched.builder && errors.builder} sx={{ background: "#DEDEDE", borderRadius: 1 }} />
                      <Field as={TextField} name="contact" label="Contact" fullWidth variant="filled" error={touched.contact && Boolean(errors.contact)} helperText={touched.contact && errors.contact} sx={{ background: "#DEDEDE", borderRadius: 1 }} />
                      <Field as={TextField} name="discount" label="Discount" fullWidth variant="filled" error={touched.discount && Boolean(errors.discount)} helperText={touched.discount && errors.discount} sx={{ background: "#DEDEDE", borderRadius: 1 }} />
                      <Field as={TextField} name="description" label="Description" fullWidth variant="filled" multiline minRows={3} error={touched.description && Boolean(errors.description)} helperText={touched.description && errors.description} sx={{ background: "#DEDEDE", borderRadius: 1 }} />
                      <Field as={TextField} name="features" label="Features" fullWidth variant="filled" multiline minRows={2} error={touched.features && Boolean(errors.features)} helperText={touched.features && errors.features} sx={{ background: "#DEDEDE", borderRadius: 1 }} />

                      {/* Amenities */}
                      <Typography sx={{ fontWeight: "bold", mt: 1 }}>Amenities</Typography>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <FormControlLabel control={<Checkbox checked={values.amenities.hasPark} onChange={(e) => setFieldValue("amenities", { ...values.amenities, hasPark: e.target.checked })} />} label="Park" />
                        <FormControlLabel control={<Checkbox checked={values.amenities.hasSecurity} onChange={(e) => setFieldValue("amenities", { ...values.amenities, hasSecurity: e.target.checked })} />} label="Security" />
                        <FormControlLabel control={<Checkbox checked={values.amenities.hasVisitorParking} onChange={(e) => setFieldValue("amenities", { ...values.amenities, hasVisitorParking: e.target.checked })} />} label="Visitor Parking" />
                        <FormControlLabel control={<Checkbox checked={values.amenities.hasTerraceGarden} onChange={(e) => setFieldValue("amenities", { ...values.amenities, hasTerraceGarden: e.target.checked })} />} label="Terrace Garden" />
                      </Box>

                      {/* Property Specifications */}
                      <Typography sx={{ fontWeight: "bold", mt: 1 }}>Property Specifications</Typography>
                      <Field as={TextField} name="propertySpecifications.bedrooms" label="Bedrooms" type="number" fullWidth variant="filled" value={values.propertySpecifications.bedrooms} onChange={(e) => setFieldValue("propertySpecifications", { ...values.propertySpecifications, bedrooms: e.target.value })} sx={{ background: "#DEDEDE", borderRadius: 1 }} />
                      <Field as={TextField} name="propertySpecifications.bathrooms" label="Bathrooms" type="number" fullWidth variant="filled" value={values.propertySpecifications.bathrooms} onChange={(e) => setFieldValue("propertySpecifications", { ...values.propertySpecifications, bathrooms: e.target.value })} sx={{ background: "#DEDEDE", borderRadius: 1 }} />
                      <Field as={TextField} name="propertySpecifications.areaSqFt" label="Area (sqft)" type="number" fullWidth variant="filled" value={values.propertySpecifications.areaSqFt} onChange={(e) => setFieldValue("propertySpecifications", { ...values.propertySpecifications, areaSqFt: e.target.value })} sx={{ background: "#DEDEDE", borderRadius: 1 }} />

                      <Button component="label" variant="outlined" sx={{ alignSelf: "flex-start" }}>
                        Replace/Add images
                        <input
                          hidden
                          multiple
                          accept="image/*"
                          type="file"
                          onChange={(e) => {
                            const files = e.currentTarget.files;
                            setFieldValue("images", files);
                            if (files && files.length > 0) {
                              const urls = Array.from(files).map((f) => URL.createObjectURL(f));
                              setUpdatePreviews(urls);
                            } else {
                              setUpdatePreviews([]);
                            }
                          }}
                        />
                      </Button>

                      {/* show existing / selected */}
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                        {updatePreviews.map((src, i) => (
                          <Box key={i} sx={{ width: 72, height: 72, borderRadius: 1, overflow: "hidden", position: "relative" }}>
                            <img src={src} alt={`u-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </DialogContent>

                  <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={handleCloseUpdate} sx={{ color: "#000" }}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} sx={{ px: 3, borderRadius: "12px", background: "linear-gradient(90deg, #98CDFF 0%, #E6AFFF 100%)", color: "#fff", textTransform: "none", "&:hover": { background: "linear-gradient(90deg, #E6AFFF 0%, #98CDFF 100%)" } }}>
                      Save Changes
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Dialog>
    </Card>
  );
};

export default PropertyManagement;
