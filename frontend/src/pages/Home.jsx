import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NodeTable from '../components/home/nodeTable';
import NodeCard from '../components/home/nodeCard';

const Home = () => {
    const [mart, setMart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('card');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/dataMart')
            .then((response) => {
                setMart(response.data.content);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [])

    return (
      <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
        <button
                className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                onClick={() => setShowType('card')}
            >
                Card View
            </button>
            <button
                className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                onClick={() => setShowType('table')}
            >
                List View
            </button>
        </div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Data For Sale</h1>
            <div className='flex gap-x-4'>
                <Link to='/dataMart/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
                <Link to='/dataMart/checkout'>
                    <FiShoppingCart className='text-black text-3xl relative top-[4px]' />
                </Link>
            </div>
        </div>
        {loading ? <Spinner /> : (showType === 'card' ? <NodeCard mart={mart} /> : <NodeTable mart={mart} />)}
      </div>
    )
}

export default Home;