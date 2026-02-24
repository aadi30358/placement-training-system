import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const Input = ({ label, error, className = '', ...props }) => (
    <div className={`w-full ${className}`}>
        {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
        <input
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${error ? 'border-red-500' : 'border-slate-300'
                }`}
            {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
);

export const Card = ({ children, title, subtitle, className = '', headerAction }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 ${className}`}>
        {(title || subtitle || headerAction) && (
            <div className="flex items-center justify-between mb-6">
                <div>
                    {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
                    {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
                </div>
                {headerAction}
            </div>
        )}
        {children}
    </div>
);
