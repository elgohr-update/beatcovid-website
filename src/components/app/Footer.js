import React from "react"

const Footer = () => {
  const versionNumber = process.env.REACT_APP_VERSION || ''

  return (
    <footer className="site-footer container">
      <p className="is-size-7">
        No part of the Coronavirus Symptom Tracker may be copied, printed, or re-produced for any 
        purpose, including research, translation or commercial, without the expressed written approval
        of Swinburne University of Technology.
      </p>

      <p className="version-number">v{versionNumber}</p>
    </footer>
  )
}

export default Footer
