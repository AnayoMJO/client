import React, { useState, useCallback, useEffect } from "react";
//import SwipeableViews from "react-swipeable-views-v18";
//import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@mui/material/MobileStepper";
import { Box, Button, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { banner1, banner2, banner3, banner4 } from "../assets/index";

//const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const bannerImages = [banner1, banner2, banner3, banner4];

export const ProductBanner = () => {
	const theme = useTheme();

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true, align: "start" },
		[Autoplay({ delay: 3000 })]
	);
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = bannerImages.length;

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setActiveStep(emblaApi.selectedScrollSnap());
	}, [emblaApi]);
	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on("select", onSelect);
		onSelect();
	}, [emblaApi, onSelect]);

	const handleNext = () => {
		emblaApi && emblaApi.scrollNext();
	};

	const handleBack = () => {
		emblaApi && emblaApi.scrollPrev();
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
	};

	return (
		<>
			<div
				ref={emblaRef}
				style={{ overflow: "hidden" }}
				width={"100%"}
				height={"100%"}
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChange={handleStepChange}
				enablemouseevents="true">
				<div>
					{bannerImages.map((image, index) => (
						<div key={index} style={{ width: "100%", height: "100%" }}>
							{Math.abs(activeStep - index) <= 0 ? (
								<Box
									component="img"
									sx={{ width: "100%", objectFit: "contain" }}
									src={image}
									alt={"Banner Image"}
								/>
							) : null}
						</div>
					))}
				</div>
			</div>
			<div style={{ alignSelf: "center" }}>
				<MobileStepper
					variant="dots"
					steps={maxSteps}
					position="static"
					activeStep={activeStep}
					nextButton={
						<Button onClick={handleNext} size="small">
							Next
						</Button>
					}
					backButton={
						<Button onClick={handleBack} size="small">
							Back
						</Button>
					}
				/>
			</div>
		</>
	);
};
