import React, { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Route, Switch, useHistory, useLocation } from "react-router-dom"
import ScrollToTop from "./components/app/ScrollToTop"
import AppHeader from "./components/app/Header"
import AppFooter from "./components/app/Footer"
import AppLoader from "./components/app/Loader"
import Acknowledgement from "./components/app/Acknowledgement"
import Contacts from "./components/app/Contacts"
import WelcomePage from "./pages/WelcomePage"
import SurveyPage from "./pages/SurveyPage"
import SummaryPage from "./pages/SummaryPage"
import PrivacyPage from "./pages/PrivacyPage"
import InformationPage from "./pages/InformationPage"
import SubmissionsPage from "./pages/SubmissionsPage"
import CalendarPage from "./pages/CalendarPage"
import NoMatchPage from "./pages/NoMatchPage"
import { logPageView } from "./utils/analyticsTracker"

import { selectLoading, selectFormVersion } from "./store/schemaSlice"
import { selectTrackerLoading } from "./store/userSlice"

import { selectRespondents, fetchStats } from "./store/statsSlice"

const HomeApp = () => {
  const dispatch = useDispatch()
  const respondentsCount = useSelector(selectRespondents)
  const appVersion = process.env.REACT_APP_VERSION || ""
  const formVersion = useSelector(selectFormVersion)
  const isLoading = useSelector(selectLoading)
  const isTrackerLoading = useSelector(selectTrackerLoading)
  const { pathname } = useLocation()
  const useSmallHeader = useMemo(
    () => pathname === "/survey" || pathname === "/calendar",
    [pathname],
  )

  useEffect(() => {
    dispatch(fetchStats())
  }, [dispatch])

  const history = useHistory()

  useEffect(() => {
    logPageView(history)
  }, [history])

  return (
    <>
      <ScrollToTop />
      <AppHeader count={respondentsCount} minimal={useSmallHeader} />

      {(isLoading || isTrackerLoading) && <AppLoader />}

      {!isLoading && !isTrackerLoading && (
        <div className="site-content">
          <Switch>
            <Route path="/" exact>
              <WelcomePage />
              <Acknowledgement />
            </Route>

            <Route path="/information" exact>
              <InformationPage />
            </Route>

            <Route path="/privacy" exact>
              <PrivacyPage />
            </Route>

            <Route path="/survey">
              <SurveyPage />
            </Route>

            <Route path="/summary">
              <SummaryPage />
              <Contacts />
            </Route>

            <Route path="/submissions">
              <SubmissionsPage />
            </Route>

            <Route path="/calendar">
              <CalendarPage />
            </Route>

            <Route path="*">
              <NoMatchPage />
            </Route>
          </Switch>
        </div>
      )}

      <AppFooter appVersion={appVersion} formVersion={formVersion} />
    </>
  )
}

export default HomeApp
