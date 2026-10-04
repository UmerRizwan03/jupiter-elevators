"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutScrollAnimations() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-about-page]");
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      page.querySelectorAll<HTMLElement>("[data-about-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      page.querySelectorAll<HTMLElement>("[data-about-stagger]").forEach((group) => {
        const items = Array.from(group.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement
        );
        if (!items.length) return;

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.1,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: group,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, page);

    return () => context.revert();
  }, []);

  return null;
}
