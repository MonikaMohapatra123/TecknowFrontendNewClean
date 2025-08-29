import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import './Sustainability.css';
import { getStoredData } from "../../JsonFiles/fetchData";
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import SocialImpactSection from '../../components/SocialImpactSection/SocialImpactSection';
import SustainabilitySection from '../../components/SustainabilitySection/SustainabilitySection';

// Lazy load components
const AllIntroTemplate = lazy(() => import("../../components/AllIntroTemplate/AllIntroTemplate"));
const AllAboutTemplate = lazy(() => import("../../components/AllAboutTemplate/AllAboutTemplate"));

function Sustainability() {
  const [totalData, setTotalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = getStoredData();
        if (storedData) setTotalData(storedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingIcon />;
  if (!totalData) return <div>Error: No data available.</div>;

  const companyData = totalData[0];

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Sustainability - Priya Infra",
    "url": "http://localhost:3000/sustainability",
    "description": "Our commitment to sustainability is at the core of our operations, ensuring that every project we undertake contributes positively to the environment.",
    "publisher": {
      "@type": "Organization",
      "name": "Priya Infra",
      "url": "https://innotechconsultant.co.in/sustainability"
    },
  };

  return (
    <div className="about-container">
      <Suspense fallback={<div>Loading...</div>}>
        <Helmet>
          <title>Sustainability - Priya Infra</title>
          <meta
            name="description"
            content="Our commitment to sustainability is at the core of our operations, ensuring that every project we undertake contributes positively to the environment."
          />
          <meta property="og:title" content="Sustainability - Priya Infra" />
          <meta
            property="og:description"
            content="Our commitment to sustainability is at the core of our operations, ensuring that every project we undertake contributes positively to the environment."
          />
          <meta property="og:image" content={companyData?.SustainabilityimageIntro} />
          <meta property="og:url" content="https://innotechconsultant.co.in/sustainability" />
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>
        <AllIntroTemplate
          description={companyData?.SustainabilityDescription}
          image={companyData?.SustainabilityimageIntro}
          title={companyData?.SustainabilityTitle}
        />
        <AllAboutTemplate
          description={companyData?.SustainabilityAboutPara}
          image={companyData?.SustainabilityAboutimage1}
          title={companyData?.SustainabilityAbouttitle}
          image2={companyData?.SustainabilityAboutimage2}
        />
        <SocialImpactSection />
        <SustainabilitySection />
      </Suspense>
    </div>
  );
}

export default Sustainability;
