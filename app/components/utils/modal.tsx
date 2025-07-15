import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";
import { classNames } from "./util";

interface Props {
  visible: boolean;
  handleVisible: () => void;
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  showLine?: boolean;
  buttomTitle?: string;
  customButtomTitle?: string;
  grayBackground?: boolean;
  hidden?: boolean;
  whiteBgHead?: boolean;
}

const ModalForm: React.FC<Props> = (props) => {
  const cancelButtonRef = React.useRef(null);

  return (
    <Transition.Root show={props.visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={() => props.handleVisible()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#666666] bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto px-2">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  props.grayBackground
                    ? "bg-neutral-neutral-100"
                    : props.hidden
                      ? "bg-transparent shadow-none"
                      : "bg-white",
                  "relative transform rounded-[15px] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                )}
              >
                {props.title ? (
                  <>
                    <div
                      className={classNames(
                        props.whiteBgHead ? "bg-white" : "bg-primary",
                        " py-4 px-6 flex rounded-tl-[15px] rounded-tr-[15px] justify-between items-center"
                      )}
                    >
                      <span
                        className={classNames(
                          props.whiteBgHead
                            ? "text-neutral-neutral-900"
                            : "text-white",
                          "fontFamily font-[600]"
                        )}
                      >
                        {props.title}
                      </span>

                      <button
                        className={classNames(
                          props.hidden ? "hidden" : "block"
                        )}
                        data-testid="button-handle-visible"
                        onClick={() => props.handleVisible()}
                      >
                        <HiOutlineX
                          className={classNames(
                            props.whiteBgHead
                              ? "text-neutral-neutral-900"
                              : "text-white",
                            "w-5 h-5"
                          )}
                        />
                      </button>
                    </div>
                    {props.showLine && (
                      <div className="w-full h-[2px] bg-gray-200" />
                    )}
                  </>
                ) : null}

                <div className="px-5 pt-5 pb-4">{props.children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalForm;
