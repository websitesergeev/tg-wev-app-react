import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные для записи</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Ваше имя'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Ваш телефон'}
                value={street}
                onChange={onChangeStreet}
            />
            {/*<select value={subject} onChange={onChangeSubject} className={'select'}>*/}
            {/*    <option value={'physical'}>Косметология</option>*/}
            {/*    <option value={'legal'}>Массаж</option>*/}
            {/*</select>*/}
            <h3>Косметология</h3>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'choice'}>Выбрать</option>
                <option value={'physical'}>Пилинг</option>
                <option value={'legal'}>Чистка</option>
                <option value={'legal'}>Фракционная мезотерапия</option>
                <option value={'legal'}>Карбокситерапия</option>
            </select>
            <h3>Массаж</h3>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'choice'}>Выбрать</option>
                <option value={'physical'}>Классический</option>
                <option value={'legal'}>Антицеллюлитный</option>
                <option value={'legal'}>Лимфодренажный</option>
            </select>

        </div>
    );
};

export default Form;
