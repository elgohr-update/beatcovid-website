import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Wizard } from "react-albus"
import Survey from "../components/survey"
import { doQuestionsGet, selectLoading, selectQuestions } from "../store/surveySlice"

const SurveyPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectLoading)
  const questions = useSelector(selectQuestions)

  useEffect(() => {
    if (questions.length === 0 && !isLoading) {
      dispatch(doQuestionsGet())
    }
  })

  const wizardStep = ({ step, push }) => {
    console.log(step)
    // this is just an example of how to intercept steps
    switch (step.id) {
      case "f/home": {
        push("f/sex")
        break
      }
      default:
        push()
    }
  }
  return (
    <div className="survey-page container">
      <Wizard
        onNext={wizardStep}
        // history={history}
        // basename={'/survey'}
        render={props => <Survey {...props} />}
      />
    </div>
  )
}

export default SurveyPage
