/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from "react";
import {
  createStyles, Text, Group, Title, Stack, Divider, TextInput, Button, PasswordInput, Box,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { showNotification } from "@mantine/notifications";
import { useAppSelector } from "../hooks/hooks";
import TableOfContents from "../components/TableOfContents";
import { useGetUserQuery, useUpdateUserMutation } from "../features/api/apiSlice";

const useStyles = createStyles(() => ({
  form: {
    minWidth: "20rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    button: {
      alignSelf: "end",
    },
  },
}));

const AccountPage = () => {
  const userId = useAppSelector((state: any) => state.user.id);
  const { data: currentUser = {}, isSuccess } = useGetUserQuery(userId);

  const [updateUser, { isSuccess: isSuccessUpdate }] = useUpdateUserMutation();
  const { classes } = useStyles();

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: errorsInfo, isDirty: isDirtyInfo },
    reset: resetInfo,
  }: any = useForm<any>({
    defaultValues: {
      name: currentUser.name,
      surname: currentUser.surname,
    },
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    setError: setErrorEmail,
    formState: { errors: errorsEmail, isDirty: isDirtyEmail },
    reset: resetEmail,
  }: any = useForm<any>({
    defaultValues: {
      email: currentUser.email,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    getValues: getValuesPassword,
    setError: setErrorPassword,
    formState: { errors: errorsPassword, isDirty: isDirtyPassword },
  }: any = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // required to manually reset formState for isDirty to work correctly
  useEffect(() => {
    resetInfo({
      name: currentUser.name,
      surname: currentUser.surname,
    });
    resetEmail({
      email: currentUser.email,
    });
  }, [currentUser]);

  const handleUpdateUser = async (data: any) => {
    const updatedUser = {
      name: data.name || currentUser.name,
      surname: data.surname || currentUser.surname,
      email: data.email || currentUser.email,
    };

    await updateUser({ ...currentUser, ...updatedUser });
    if (!isSuccessUpdate) {
      setErrorEmail("email", {
        type: "manual",
        message: "email unavailable",
      });
    } else {
      showNotification({
        title: "Details changed",
        message: "Successfully changed personal info",
      });
    }
  };

  const handleUpdatePassword = async (data: any): Promise<void> => {
    await updateUser({ ...currentUser, ...data });
    if (!isSuccess) {
      setErrorPassword("currentPassword", {
        type: "manual",
        message: "Wrong password",
      });
    } else {
      showNotification({
        title: "Details changed",
        message: "Successfully changed passwords",
      });
    }
  };

  const links = [
    {
      label: "Basics",
      link: "#account-basics",
      order: 1,
    },
    {
      label: "Email",
      link: "#account-email",
      order: 1,
    },
    {
      label: "Security",
      link: "#account-security",
      order: 1,
    },
    {
      label: "Perferences",
      link: "#focus",
      order: 1,
    },
    {
      label: "General",
      link: "#2",
      order: 2,
    },
    {
      label: "Decks",
      link: "#3",
      order: 2,
    },
  ];

  return (
    <Stack>
      <Title pt="lg" pl="lg">Profile</Title>
      <Group noWrap spacing="6rem">
        <Box sx={(theme) => ({
          alignSelf: "flex-start",
          position: "sticky",
          top: 0,
          [theme.fn.smallerThan("md")]: {
            display: "none",
          },
        })}
        >
          <TableOfContents links={links} />
        </Box>

        <Stack w="100%" justify="center">
          <Stack px="lg">
            <Group id="account-basics" grow>
              <Stack>
                <Title order={2}>Basics</Title>
                <Text fz="sm" c="dimmed">So we know what to call you</Text>
              </Stack>

              <form className={classes.form} onSubmit={handleSubmitInfo(handleUpdateUser)}>
                <TextInput
                  label="Name"
                  error={errorsInfo.name && errorsInfo.name.message}
                  {...registerInfo("name", {
                    pattern: {
                      value: /^[A-Z]{2,}$/i,
                      message: "invalid name",
                    },
                  })}
                />
                <TextInput
                  label="Surname"
                  error={errorsInfo.surname && errorsInfo.surname.message}
                  {...registerInfo("surname", {
                    pattern: {
                      value: /^[A-Z]{2,}$/i,
                      message: "invalid surname",
                    },
                  })}
                />
                {isDirtyInfo && <Button type="submit">Update</Button>}
              </form>
            </Group>
            <Divider my="sm" />
            <Group id="account-email" grow>
              <Stack>
                <Title order={2}>Email</Title>
                <Text fz="sm" c="dimmed">So we know where to contact you</Text>
              </Stack>
              <form className={classes.form} onSubmit={handleSubmitEmail(handleUpdateUser)}>
                <TextInput
                  label="Email"
                  error={errorsEmail.email && errorsEmail.email.message}
                  {...registerEmail("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
                {isDirtyEmail && <Button type="submit">Update</Button>}
              </form>
            </Group>
            <Divider my="sm" />
            <Group id="account-security" grow>
              <Stack>
                <Title order={2}>Password</Title>
                <Text fz="sm" c="dimmed">So only you can access your cards</Text>
              </Stack>
              <form className={classes.form} onSubmit={handleSubmitPassword(handleUpdatePassword)}>
                <PasswordInput
                  label="Password"
                  error={errorsPassword.currentPassword && errorsPassword.currentPassword.message}
                  {...registerPassword("currentPassword", {
                    required: "required",
                    minLength: {
                      value: 8,
                      message: "minimum of 8 characters",
                    },
                  })}
                />

                <PasswordInput
                  label=" new password"
                  error={errorsPassword.newPassword && errorsPassword.newPassword.message}
                  {...registerPassword("newPassword", {
                    required: "required",
                    minLength: {
                      value: 8,
                      message: "minimum of 8 characters",
                    },
                  })}
                />

                <PasswordInput
                  label="Confirm password"
                  error={errorsPassword.confirmPassword && errorsPassword.confirmPassword.message}
                  {...registerPassword("confirmPassword", {
                    required: "required",
                    minLength: {
                      value: 8,
                      message: "minimum of 8 characters",
                    },
                    validate: {
                      value: (value: any) => value === getValuesPassword("newPassword") || "password does not match",
                    },
                  })}
                />

                {isDirtyPassword && <Button type="submit">Update</Button>}
              </form>
            </Group>
          </Stack>
        </Stack>
      </Group>
    </Stack>

  );
};

export default AccountPage;
