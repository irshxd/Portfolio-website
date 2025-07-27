import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedSection = ({ children, id, className = "" }) => {
  const ref = useRef(null);
  // The `once: true` option ensures the animation only happens once.
  // `amount: 0.2` means the animation triggers when 20% of the element is visible.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        // The parent container will stagger the animation of its children.
        visible: { transition: { staggerChildren: 0.2 } }
      }}
      className={`py-24 ${className}`}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </motion.section>
  );
};

export default AnimatedSection;