import Link from "next/link";
import Head from "next/head";
import Title from "../components/title";
import useI18n from "../hooks/use-i18n";
import { languages } from "../lib/i18n";

const HomePage = () => {
  const i18n = useI18n();

  return (
    <div>
      <Head></Head>
      <Title username="Peter" />
      <h2>{i18n.t("intro.text")}</h2>
      <h3>{i18n.t("intro.description")}</h3>
      <div>Current locale: {i18n.activeLocale}</div>
      <Link
        href={`/${languages
          .filter((lng) => lng !== i18n.activeLocale)
          .reduce((_, cur) => `${cur}`)}`}
        locale={`${languages
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

export async function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  };
}

export default HomePage;
