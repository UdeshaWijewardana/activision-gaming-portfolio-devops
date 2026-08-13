export const ease = [0.22, 1, 0.36, 1]
export const fadeUp = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: .78, ease } } }
export const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: .65, ease } } }
export const fadeScale = { hidden: { opacity: 0, scale: .97 }, show: { opacity: 1, scale: 1, transition: { duration: .8, ease } } }
export const imageReveal = { hidden: { clipPath: 'inset(0 0 100% 0)' }, show: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1.1, ease } } }
export const staggerChildren = { hidden: {}, show: { transition: { staggerChildren: .11 } } }
export const pageTransition = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: .45 } }, exit: { opacity: 0, transition: { duration: .25 } } }
