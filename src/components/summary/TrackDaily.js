import React from "react"
import { useIntl } from "react-intl"
import ImgClock from "../../assets/img/24hourclock.png"

const TrackDaily = () => {
  const intl = useIntl()

  return (
    <section className="track-daily-section card is-info">
      <header>
        {intl.formatMessage({
          id: "web.tracker.daily.header",
          defaultMessage: "Keep tracking daily",
        })}
      </header>
      <div className="card-content">
        <p>
          {intl.formatMessage({
            id: "web.tracker.daily.learn",
            defaultMessage:
              "We learn more about COVID-19 every day you come back to use the Symptom Tracker.",
          })}
        </p>

        <div className="clock-wrapper">
          <img src={ImgClock} alt="24 hour clock" />
        </div>

        <p>
          {intl.formatMessage({
            id: "web.tracker.daily.monitor",
            defaultMessage:
              "You can monitor your own health by coming back every day to see how your symptoms change over time. The questions in the Symptom Tracker may change as we learn more about COVID-19.",
          })}
        </p>

        <p>
          {intl.formatMessage({
            id: "web.tracker.daily.follow",
            defaultMessage: "Follow us on.",
          })}{" "}
          <a href="https://www.facebook.com/groups/453230132092365/">
            {intl.formatMessage({
              id: "web.facebook",
              defaultMessage: "Facebook.",
            })}
          </a>{" "}
          {intl.formatMessage({
            id: "web.or",
            defaultMessage: "or",
          })}{" "}
          <a href="https://twitter.com/BeatCovid19Now">
            {intl.formatMessage({
              id: "web.twitter",
              defaultMessage: "Twitter.",
            })}
          </a>
        </p>
      </div>
    </section>
  )
}

export default TrackDaily
