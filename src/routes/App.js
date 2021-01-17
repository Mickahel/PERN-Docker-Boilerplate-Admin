import React, {
  lazy,
  useEffect,
  useCallback,
  useContext,
  useState,
  Suspense,
} from "react";
import { Route, Switch } from "react-router-dom";
import Theme from "theme";
import { UserContext } from "contexts/Providers/UserProvider";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import Endpoints from "Endpoints";
import "../sass/main.scss";
import RoundLoader from "components/RoundLoader";
import { useHistory } from "react-router-dom";
import useFetch from "hooks/useFetch";
import NotificationsHandler from 'theme/NotificationsHandler'

import Account from "./Account";
import UsersManagementSystem from "./UsersManagementSystem"
const ErrorNotFound = lazy(() => import("views/Placeholders/ErrorNotFound"));
const Feedbacks = lazy(() => import("views/Feedbacks"));
const Home = lazy(() => import("views/Home"));
const Dashboard = lazy(() => import("views/Dashboard"));
const Logs = lazy(() => import("views/Logs"));

function App(props) {
  const userContext = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { fetch } = useFetch();

  const isAdmin = (user) => {
    if (!user) return false;
    return (user.role === 'ADMIN' || user.role === 'SUPERADMIN')
  }
  useEffect(() => {
    checkUserIdentity();
  }, []);

  const checkUserIdentity = useCallback(async () => {
    if (userContext.user && isAdmin(userContext.user)) {
      setLoading(false);
      return;
    }
    // ? qui non ho l'utente
    try {
      const data = await fetch({
        method: "GET",
        url: Endpoints.user.profile,
        redirectToPage500: true,
      });

      if (!isAdmin(data)) {
        themeContext.showWarningDialog({
          message: "youAreNotAnAdministrator",
          onClose: async () => {
            try {
              await fetch({
                url: Endpoints.auth.logout,
                method: "DELETE",
              });
              history.push("auth/login?returnUrl=" + history.location.pathname);
              userContext.setUser(undefined);
            } catch (e) { }
          }
        })
        return
      }
      userContext.setUser(data);
      setLoading(false);
    } catch (e) {
      if (e?.status == 404) {
        history.push("auth/login?returnUrl=" + history.location.pathname);
        //themeContext.showWarningSnackbar({ message: "loginAgain" })
      }
      //console.log("BBB",history.location.pathname)
      //history.push("auth?returnUrl=" + history.location.pathname)
    }
  }, []);

  if (loading) return <RoundLoader />;
  return (
    <Theme>
      <Suspense fallback={<RoundLoader />}>
        <NotificationsHandler />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/users-management-system*" component={UsersManagementSystem} />
          <Route exact path="/feedbacks" component={Feedbacks} />
          <Route exact path="/logs" component={Logs} />
          <Route path="/account*" exact component={Account} />
          <Route exact path="/" component={Home} />
          <Route component={ErrorNotFound} />
        </Switch>
      </Suspense>
    </Theme>
  );
}

export default App;
