import { createContext, useContext, useEffect, useState } from "react"
import cookies from "js-cookie"

const credentials_cookie_key = "credentials"
const initialCredentials = {
  openaiApiKey: "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",
  pineconeEnvironment: "eu-west4-gcp",
  pineconeIndex:"test",
  pineconeApiKey: "b9262921-b168-478f-875d-a925ed377957",
  githubPersonalToken: "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",
}

const CredentailsCookieContext = createContext({
  cookieValue: null,
  setAndSaveCookieValue: null,
})

export function CredentialsCookieProvider({ children }) {
  const [cookieValue, setCookieValue] = useState(initialCredentials)

  useEffect(() => {
    const valuesFromCookie = cookies.get(credentials_cookie_key)

    if (valuesFromCookie) {
      setCookieValue(JSON.parse(valuesFromCookie))
    }
  }, [])

  const setAndSaveCookieValue = (value) => {
    cookies.set(credentials_cookie_key, JSON.stringify(value), { expires: 7 })
    setCookieValue(value)
  }

  return (
    <CredentailsCookieContext.Provider
      value={{ cookieValue, setAndSaveCookieValue }}
    >
      {children}
    </CredentailsCookieContext.Provider>
  )
}

export function useCredentialsCookie() {
  return useContext(CredentailsCookieContext)
}
