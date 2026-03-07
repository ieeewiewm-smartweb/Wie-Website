import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BulletItemProps {
  children: ReactNode;
  delay?: number;
  animate?: boolean;
}

export const BulletItem = ({ children, delay = 0, animate = true }: BulletItemProps) => {
  const content = (
    <div className="flex items-start gap-3">
      <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-gray-700 leading-relaxed">{children}</p>
    </div>
  );

  if (!animate) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
};
