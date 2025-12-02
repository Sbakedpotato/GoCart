import React from 'react'
import { FiAlertTriangle, FiX } from 'react-icons/fi'

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDangerous = false
}) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isDangerous ? 'bg-red-100 text-red-600' : 'bg-brand-light text-brand-black'}`}>
                            <FiAlertTriangle className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-brand-black mb-2">{title}</h3>
                            <p className="text-brand-gray leading-relaxed">{message}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-brand-gray hover:text-brand-black transition-colors"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-semibold text-brand-gray hover:bg-brand-light transition-all"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm()
                                onClose()
                            }}
                            className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all transform hover:-translate-y-0.5 ${isDangerous
                                    ? 'bg-red-600 hover:bg-red-700 shadow-red-200'
                                    : 'bg-brand-black hover:bg-brand-dark shadow-brand-black/20'
                                }`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
