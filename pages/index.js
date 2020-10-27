import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Title from "../components/title";
import useI18n from "../hooks/use-i18n";

const HomePage = () => {
  const router = useRouter();
  const { locales } = router;
  const i18n = useI18n();

  return (
    <div>
      <Head></Head>
      <Title username="Peter" />
      <h2>{i18n.t("intro.text")}</h2>
      <h3>{i18n.t("intro.description")}</h3>
      <div>Current locale: {i18n.activeLocale}</div>
      <Link
        href={`/${locales
          .filter((lng) => lng !== i18n.activeLocale)
          .reduce((_, cur) => `${cur}`)}`}
        locale={`${locales
          .filter((lng) => lng !== i18n.activeLocale)
          .reduce((_, cur) => `${cur}`)}`}
      >
        <a>Use cient-side routing to change language to 'de'</a>
      </Link>
    </div>
  );
};

export async function getStaticProps(context) {
  const { locale } = context;
  const { default: lngDict = {} } = await import(`locales/${locale}.json`);

  return {
    props: { lng: locale, lngDict },
  };
}

export default HomePage;
