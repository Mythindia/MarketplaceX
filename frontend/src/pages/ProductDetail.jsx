import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const data = await productService.getProductById(id);
            setProduct(data);
        } catch (err) {
            setError('Failed to load product details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBuyNow = () => {
        navigate(`/payment/${id}`, { state: { product } });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="error-container">
                <p>{error || 'Product not found'}</p>
                <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-card">
                <div className="product-detail-image">
                    <img src={product.image_url} alt={product.name} />
                </div>

                <div className="product-detail-info">
                    <span className="product-category">{product.category}</span>
                    <h1 className="product-detail-title">{product.name}</h1>
                    <p className="product-detail-description">{product.description}</p>

                    <div className="product-detail-meta">
                        <div className="product-detail-price">
                            <span className="price-label">Price:</span>
                            <span className="price-value">₹{product.price.toFixed(2)}</span>
                        </div>

                        <div className="product-detail-stock">
                            <span className="stock-label">Availability:</span>
                            <span className={`stock-value ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                                {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
                            </span>
                        </div>
                    </div>

                    <div className="product-detail-actions">
                        <button
                            onClick={handleBuyNow}
                            className="btn btn-primary btn-large"
                            disabled={product.stock === 0}
                        >
                            {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn btn-secondary btn-large"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
