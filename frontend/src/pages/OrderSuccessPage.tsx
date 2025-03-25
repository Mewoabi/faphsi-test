import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import myAxios from '../utils/axios-instance';

const OrderSuccessPage = () => {
    const transId = localStorage.getItem('transId');

    useEffect(() => {
        const verifyTransaction = async () => {
            try {
                const res = await myAxios.get(`/payments/status/${transId}`);
                console.log(res.data); // Display the response data in the console
            } catch (error) {
                console.error('Error verifying transaction:', error);
            }
        };

        if (transId) {
            verifyTransaction();
        }
    }, [transId]);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to={'/'}>
                <p>Back to home page</p>
            </Link>
            <h1>Order Completed Successfully! 🎉</h1>
            <p>Thank you for your trusting in us</p>
        </div>
    );
};

export default OrderSuccessPage;
