import { useState, useRef, useCallback, useMemo } from 'react';

const useModal = <TModalData>() => {
  const modalData = useRef<TModalData>();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback((data: TModalData) => {
    modalData.current = data;
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const modalProps = useMemo(
    () => ({
      isOpen,
      onClose,
      ...modalData.current,
    }),
    [isOpen, onClose]
  );

  return { onOpen, modalProps };
};

export default useModal;
