import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useForm, Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const regions = [
  "dolnośląskie",
  "kujawsko-pomorskie",
  "lubelskie",
  "lubuskie",
  "łódzkie",
  "małopolskie",
  "mazowieckie",
  "opolskie",
  "podkarpackie",
  "podlaskie",
  "pomorskie",
  "śląskie",
  "świętokrzyskie",
  "warmińsko-mazurskie",
  "wielkopolskie",
  "zachodniopomorskie",
];

export default function AdditionalForm() {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [education, setEducation] = useState();
  const [typeOfEducation, setTypeOfEducation] = useState();
  const [region, setRegion] = useState();
  const [phone, setPhone] = useState("fdsfds");

  const AdditionalFormSchema = yup.object().shape({
    firstname: yup.string().required("Imię jest wymagane"),
    lastname: yup.string().required("Nazwisko jest wymagane"),
    region: yup.string().required("Województwo jest wymagane"),
    education: yup.string().required("Wykształcenie jest wymagane"),
    typeOfEducation: yup
      .string()
      .required("Kierunek wykształcenia jest wymagany"),
    phone: yup
      .number()
      .typeError("Pole musi być numerem")
      .min(6, "Numer musi być 6 cyfrowy")
      .max(7, "Numer nie może być większy niż 6 cyfrowy")
      .required("Numer jest wymagany")
      .integer(),
    // website: yup.string().url(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AdditionalFormSchema),
  });

  const onSubmit = (data) => {
    console.log(data, errors, region);
    console.log(errors);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        paragraph
        sx={{ mt: 4 }}
      >
        Aby zobaczyć swoje certyfikaty uzupełnij profil
      </Typography>
      <Button variant="outlined" onClick={handleClickOpen}>
        Uzupełnij formularz
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uzupełnij dane</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aby zobaczyć swoje certyfikaty uzupełnij profil
          </DialogContentText>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { ml: 0, mb: 3, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Imię"
                defaultValue={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                name="firstname"
                {...register("firstname")}
                helperText={errors.firstname && errors.firstname.message}
                error={errors.firstname !== undefined}
              />
              <TextField
                required
                id="outlined-required"
                label="Nazwisko"
                defaultValue={lastname}
                onChange={(e) => setLastname(e.target.value)}
                {...register("lastname")}
                helperText={errors.lastname && errors.lastname.message}
                error={errors.lastname !== undefined}
              />
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={errors.region !== undefined}
              >
                <InputLabel id="demo-simple-select-label">
                  Województwo
                </InputLabel>

                <Select
                  name="region"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // defaultValue={region}
                  // value={region}
                  onChange={(e) => console.log(e.target.value)}
                  label="Województwo"
                  {...register("region")}
                >
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.region && errors.region.message}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={errors.education !== undefined}
              >
                <InputLabel id="demo-simple-select-label">
                  Wykształcenie
                </InputLabel>
                <Select
                  name="education"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={education}
                  label="Wykształcenie"
                  onChange={(e) => setEducation(e.target.value)}
                  {...register("education")}
                >
                  <MenuItem value="Wyższe">Wyższe</MenuItem>
                  <MenuItem value="Średnie">Średnie</MenuItem>
                  <MenuItem value="Zawodowe">Zawodowe</MenuItem>
                  <MenuItem value="Podstawowe">Podstawowe</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.education && errors.education.message}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={errors.typeOfEducation !== undefined}
              >
                <InputLabel id="demo-simple-select-label">
                  Kierunek wykształcenia
                </InputLabel>
                <Select
                  name="typeOfEducation"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={typeOfEducation}
                  label="Kierunek wykształcenia"
                  onChange={(e) => setTypeOfEducation(e.target.value)}
                  {...register("typeOfEducation")}
                >
                  <MenuItem value="Budowlane">Budowlane</MenuItem>
                  <MenuItem value="Informatyczne">Informatyczne</MenuItem>
                  <MenuItem value="Gastronomiczne">Gastronomiczne</MenuItem>
                  <MenuItem value="Medyczne">Medyczne</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.typeOfEducation && errors.typeOfEducation.message}
                </FormHelperText>
              </FormControl>
              <TextField
                required
                id="outlined-required"
                label="Telefon"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                {...register("phone")}
                helperText={errors.phone && errors.phone.message}
                error={errors.phone !== undefined}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "center" }}
              ></Stack>
            </div>
            <Button onClick={handleClose}>Uzupełnię później</Button>
            <Button type="submit">Zapisz</Button>
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
