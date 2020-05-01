import { createSlice } from "@reduxjs/toolkit"
import parseISO from "date-fns/parseISO"
import getTime from "date-fns/getTime"
import { api } from "../api/agent"

// @TODO: remove this workaround when date_submitted is UTC.
function checkDate(d) {
  const timeLength = d.length
  if (d[timeLength - 1] !== "Z") {
    return `${d}Z`
  }
  return d
}
/////

function getColourClass(score) {
  switch (score) {
    case "A":
      return "is-success"
    case "B":
    case "C":
    case "D":
      return "is-warning"
    case "E":
    case "F":
      return "is-danger"
    default:
      return ""
  }
}

export const slice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    results: null,
    isLoading: false,
    isTrackerError: false,
    tracker: null,
    scores: [],
    notableDates: [],
  },
  reducers: {
    setUserId: (state, { payload }) => {
      state.userId = payload
    },
    setResults: (state, { payload }) => {
      state.results = payload
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    setIsTrackerError: (state, { payload }) => {
      state.isTrackerError = payload
    },
    setTracker: (state, { payload }) => {
      state.tracker = payload
    },
    setScores: (state, { payload }) => {
      state.scores = payload
    },
    setNotableDates: (state, { payload }) => {
      state.notableDates = payload
    },
  },
})

export const {
  setUserId,
  setResults,
  setIsLoading,
  setTracker,
  setIsTrackerError,
  setScores,
  setNotableDates,
} = slice.actions

export const doSetUser = user => dispatch => {
  const userObj = { ...user }
  const lastSubmission = userObj.last_submission
  const results = {}

  if (lastSubmission) {
    Object.keys(lastSubmission).forEach(key => {
      results[key] = lastSubmission[key]
    })
  }

  dispatch(setResults(results))
  dispatch(setUserId(userObj.id))
}

export const doTrackerGet = () => dispatch => {
  dispatch(setIsLoading(true))

  api
    .getTracker()
    .then(r => {
      console.log("tracker", r)
      dispatch(setTracker(r))

      let scores = r.scores.map(s => {
        return {
          date: checkDate(s.date_submitted),
          risk: s.risk,
          summary: s.summary,
          main: s.main,
          other: s.other,
          riskScore: s.risk.score,
          colourClass: getColourClass(s.risk.score),
        }
      })
      scores.sort(
        (a, b) => getTime(parseISO(b.date)) - getTime(parseISO(a.date)),
      )
      dispatch(setScores(scores))

      const notableDates = []
      if (r.contact_last_date) {
        notableDates.push({
          date: r.contact_last_date,
          iconLocation: "/img/icons/icon-contact.svg",
        })
      }
      if (r.travel_date) {
        notableDates.push({
          date: r.travel_date,
          iconLocation: "/img/icons/icon-travel.svg",
        })
      }
      if (r.test_date) {
        notableDates.push({
          date: r.test_date,
          iconLocation: "/img/icons/icon-test.svg",
        })
      }
      if (r.face_contact_limit_date) {
        notableDates.push({
          date: r.face_contact_limit_date,
          iconLocation: "/img/icons/icon-isolate.svg",
        })
      }
      dispatch(setNotableDates(notableDates))
    })
    .catch(e => {
      dispatch(setIsTrackerError(true))
      console.error(e)
    })
    .then(() => {
      dispatch(setIsLoading(false))
    })
}

export const selectUserId = state => state.user.userId
export const selectUserResults = state => state.user.results
export const selectTrackerLoading = state => state.user.isLoading
export const selectIsTrackerError = state => state.user.isTrackerError
export const selectTracker = state => state.user.tracker
export const selectUserScores = state => state.user.scores
export const selectNotableDates = state =>
  state.user.notableDates.map(n => {
    return {
      date: parseISO(n.date),
      iconLocation: n.iconLocation,
    }
  })

export default slice.reducer
