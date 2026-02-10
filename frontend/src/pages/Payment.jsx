import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { orderService } from '../services/orderService';

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;

    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setProcessing(true);

        // Simulate payment processing
        setTimeout(async () => {
            try {
                // Create order
                const orderData = {
                    items: [
                        {
                            productId: parseInt(id),
                            quantity: 1,
                        },
                    ],
                };

                await orderService.createOrder(orderData);

                // Success! Navigate to orders page
                navigate('/orders', {
                    state: { message: 'Payment successful! Your order has been placed.' }
                });
            } catch (err) {
                setError(err.response?.data?.error || 'Payment failed');
                setProcessing(false);
            }
        }, 2000); // 2 second delay for payment processing simulation
    };

    if (!product) {
        return (
            <div className="error-container">
                <p>Product information not found</p>
                <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h1 className="payment-title">Complete Your Purchase</h1>

                <div className="payment-product-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-item">
                        <img src={product.image_url} alt={product.name} />
                        <div>
                            <h4>{product.name}</h4>
                            <p>{product.category}</p>
                        </div>
                        <div className="summary-price">₹{product.price.toFixed(2)}</div>
                    </div>
                    <div className="summary-total">
                        <span>Total:</span>
                        <span className="total-amount">₹{product.price.toFixed(2)}</span>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="payment-notice">
                        ⚠️ This is a dummy payment gateway for demonstration purposes only.
                        No real payment will be processed.
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardName">Cardholder Name</label>
                        <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            maxLength="16"
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                required
                                placeholder="MM/YY"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                required
                                maxLength="3"
                                placeholder="123"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <span className="spinner-small"></span>
                                Processing Payment...
                            </>
                        ) : (
                            `Pay ₹${product.price.toFixed(2)}`
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(`/product/${id}`)}
                        className="btn btn-secondary btn-block"
                        disabled={processing}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
