import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t, i18n } = useTranslation("global")

  return (
    <header>
      {t("header.chooseLanguage")}
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("ua")}>UA</button>
    </header>
  )
}