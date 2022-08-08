import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { createKid } from "../redux/thunks/parent.thunk";
import { useDispatch, useSelector } from "react-redux";
import { toggleKidModal } from "../redux/slices/parent.slice";
import { toggleSnackbar } from "../redux/slices/user.slice";

/////////////////////////////////////////////////////////////
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const NewKidForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.parent);

  const [showPassword, setShowPassword] = useState(false);

  const NewKidSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Full Name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    phone: Yup.string()
      .min(9, "Too Short!")
      .max(9, "Too Long!")
      .required("Phone Number required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: NewKidSchema,
    onSubmit: async () => {
      const { fullname, email, phone, password } = formik.values;
      const res = await dispatch(
        createKid({ fullname, email, phone, password })
      );
      if (res.payload.id) {
        dispatch(toggleKidModal(false));
        dispatch(
          toggleSnackbar({
            showSnackbar: true,
            message: "Kid created successfully",
            severity: "success",
          })
        );
      } else {
        dispatch(toggleKidModal(false));
        message && dispatch(
          toggleSnackbar({
            showSnackbar: true,
            message: message,
            severity: "error",
          })
        );
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Box
      sx={{
        padding: "2rem",
      }}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack
              component={motion.div}
              initial={{ opacity: 0, y: 60 }}
              animate={animate}
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <TextField
                fullWidth
                label="Full Name"
                {...getFieldProps("fullname")}
                error={Boolean(touched.fullname && errors.fullname)}
                helperText={touched.fullname && errors.fullname}
              />
            </Stack>

            <Stack
              spacing={3}
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={animate}
            >
              <TextField
                fullWidth
                autoComplete="email"
                type="email"
                label="Email address"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                autoComplete="phone"
                type="number"
                label="Phone number"
                {...getFieldProps("phone")}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                {...getFieldProps("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <Icon
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={animate}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                ADD KID
              </LoadingButton>
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default NewKidForm;
