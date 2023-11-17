

function ToastContainer({ children }) {
    return (
      <div className="SlideToast justify-end top-0 right-0 absolute float-right z-10 overflow-hidden" style={{ zIndex: 100 }}>
        {children}
      </div>
    );
  }
  
  export default ToastContainer;