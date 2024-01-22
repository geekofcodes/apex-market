// AnimatedButton.js (client/src/components/AnimatedButton.js)
import React from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';

const AnimatedButton = ({ children, ...props }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant="contained" color="primary" {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
