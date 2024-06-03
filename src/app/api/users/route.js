import { connectMongoDB } from '../../../config/db.js';
import User from '../../../models/users.js';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connectMongoDB();
        const user = await User.find();
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { firstname,lastname, email, phone, city, state, zip} = await req.json();
        await connectMongoDB();
        const user = await User.findOne({ email: email});
        if (!user) {
            const newUser = await User.create({
                firstname: firstname, 
                lastname: lastname, 
                email: email, 
                phone: phone,
                city: city,
                state: state,
                zip: zip
            });
            return NextResponse.json(newUser,{ status: 200 });
        }else{
            return NextResponse.json({ error: 'User already exists' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { firstname,lastname, email, phone, city, state, zip} = await req.json();
        await connectMongoDB();
        const user = await User.findOneAndUpdate({ email: email }, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            city: city,
            state: state,
            zip: zip
        }, {
            new: true
        });
        if (user) {
            return NextResponse.json(user,{ status: 200 });
        }else{
            return NextResponse.json({ error: 'User Not exists' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { email } = await req.json();
        console.log('email :', email);
        await connectMongoDB();
        const user = await User.findOneAndDelete({ email: email });
        if (user) {
            return NextResponse.json(user,{message: "User Deleted" ,status: 200 });
        }else{
            return NextResponse.json({ error: 'User not exists' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}