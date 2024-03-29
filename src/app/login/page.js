
"use client"
import { Button, CircularProgress, Grid, Snackbar, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

const Login = () => {
  const { data: session, status } = useSession();
  const isClient = useClient();
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      setAlertMessage("You have been successfully logged in.");
      // router.push("/");
    } else if (status === "unauthenticated") {
      setAlertMessage("You have been successfully logged out.");
    }
  }, [status]);

  const handleSignIn = async () => {
    await signIn("google");
  };

  const handleSignOut = async () => {
    await signOut();
  
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  if (!isClient) {
    return null;
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Typography variant="h2" align="center" gutterBottom>
          OnlineStore
        </Typography>
      </Grid>
      <Grid item>
        {status === "loading" ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" onClick={status === "authenticated" ? handleSignOut : handleSignIn}>
            {status === "authenticated" ? "Sign Out" : "Login With Google"}
          </Button>
        )}
      </Grid>
      <Snackbar
        open={Boolean(alertMessage)}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={alertMessage}
      />
    </Grid>
  );
};

export default Login;
