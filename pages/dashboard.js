import { useEffect } from "react";
import useI18n from "../hooks/use-i18n";
import Title from "../components/title";
import EN from "../locales/en.json";
import DE from "../locales/de.json";

const Dashboard = () => {
  const i18n = useI18n();

  useEffect(() => {
    i18n.locale("en", EN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Title username="Peter" />
      <h2>{i18n.t("intro.text")}</h2>
      <h3>{i18n.t("dashboard.description")}</h3>
      <div>Current locale: {i18n.activeLocale}</div>
      <a
        href="#"
        onClick={() => {
          i18n.locale("de", DE);
        }}
      >
        Change language client-side to 'de'
      </a>
    </div>
  );
};

export default Dashboard;
