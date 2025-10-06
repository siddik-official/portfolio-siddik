/* eslint-disable react/prop-types */
"use client";
import { useEffect, useMemo, useState, memo, lazy, Suspense } from "react";
import { useTheme } from "next-themes";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

// Optimized cloud properties with reduced animation complexity
export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#000",
    // Reduced animation speed for better performance
    maxSpeed: 0.03,
    minSpeed: 0.01,
    // Disable drag control for better performance
    dragControl: false,
    // Limit number of tags for better performance
    maxTags: 30,
    // Reduce animation steps for smoother performance
    animTiming: "Smooth",
    // Reduce shadow intensity
    shadowBlur: 0,
    // Disable shadow for better performance
    shadow: false,
    // Reduce texture for better performance
    textureOpt: false,
  },
};

// Memoized icon renderer function for better performance
export const renderCustomIcon = (icon, theme) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  });
};

// Loading placeholder for lazy loading
const LoadingPlaceholder = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
  </div>
);

const IconCloud = memo(({ iconSlugs = [], imageArray }) => {
  const [data, setData] = useState(null);
  const { theme } = useTheme();

  // Fetch icons only when component mounts or iconSlugs changes
  useEffect(() => {
    let isMounted = true;
    if (iconSlugs.length > 0) {
      // Limit the number of icons to fetch for better performance
      const limitedSlugs = iconSlugs.slice(0, 25);
      fetchSimpleIcons({ slugs: limitedSlugs }).then((result) => {
        if (isMounted) setData(result);
      });
    }
    return () => { isMounted = false; };
  }, [iconSlugs]);

  // Memoize rendered icons to prevent unnecessary re-renders
  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) => 
      renderCustomIcon(icon, theme || "dark")
    );
  }, [data, theme]);

  // Memoize image elements to prevent unnecessary re-renders
  const imageElements = useMemo(() => {
    if (!imageArray || imageArray.length === 0) return null;
    
    return imageArray.map((image, index) => (
      <a key={index} href="#" onClick={(e) => e.preventDefault()}>
        <img 
          height="42" 
          width="42" 
          alt="Icon" 
          src={image} 
          loading="lazy" 
        />
      </a>
    ));
  }, [imageArray]);

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      {/* @ts-ignore */}
      <Cloud {...cloudProps}>
        {renderedIcons && imageElements ? (
          <>
            {renderedIcons}
            {imageElements}
          </>
        ) : renderedIcons ? renderedIcons : imageElements}
      </Cloud>
    </Suspense>
  );
});

IconCloud.displayName = "IconCloud";

export default IconCloud;
