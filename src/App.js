import './App.css';
import { useState } from 'react';

function App() {
  const menuList = [
    {
      id: 1, 
      menu: "커트",
      price : 15000
    } 
    , 
    {
      id: 2, 
      menu: "셋팅펌",
      price : 80000
    },
    {
      id: 3, 
      menu: "볼륨매직",
      price : 100000
    },
    {
      id: 4, 
      menu: "C컬펌",
      price : 130000
    },
    {
      id: 5, 
      menu: "다운펌",
      price : 30000
    },
    {
      id: 6, 
      menu: "탈색",
      price : 80000
    },
    {
      id: 7, 
      menu: "염색",
      price : 50000
    },
    {
      id: 8, 
      menu: "클리닉",
      price : 80000
    },
    {
      id: 9, 
      menu: "드라이",
      price : 13000
    }
  ];
  const coupon = [
    {id: 1, name: '첫 방문 할인', rate: 15},
    {id: 2, name: '지인 할인', rate: 10},
    {id: 3, name: 'Silver 회원 상시 할인', rate: 13},
    {id: 4, name: 'Gold 회원 상시 할인', rate: 15},
    {id: 5, name: 'Platinum 회원 상시 할인', rate: 20}
  ]
  const [selectList, setSelectList] = useState([]);
  const [beforeDiscount, setBeforeDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const handleChangeMenu = (checked, item) => {

    if(checked) {
      setSelectList((prev) => [...prev, item]);
      setBeforeDiscount((prev) => prev += item.price);
      setTotal((prev) => prev += item.price)
    } else {
      setSelectList(selectList.filter(el => el.id !== item.id));
      setBeforeDiscount((prev) => prev -= item.price);
      setTotal((prev) => prev -= item.price)
    }
  }

  const handlingMonetaryUnit = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleSelectCoupon = (selected) => {
    setTotal( beforeDiscount - (beforeDiscount * (selected *0.01)) )
  }

  return (
    <div className='container'>
      <h3>XXX shop</h3>
      <div className='billBox'>

        <div className='totalList'>
          
          <h1>가격표</h1>
          <div className='menuList'>

            {menuList.map((item, key) => {
              return <div key={key}>
                      <label>
                        <input type='checkbox' value={item}
                          onChange={(e) => handleChangeMenu(e.target.checked, item)}></input>
                        {item.menu} : {handlingMonetaryUnit(item.price)}원
                      </label>
                    </div>
              })}
          </div>
              
          <hr />

          <div className='beforeDiscountBox'>
            <p>시술 :&nbsp;{selectList.map(el => `${el.menu} `) }</p>
            <p>쿠폰 적용 전 :&nbsp; 
              {
                handlingMonetaryUnit(beforeDiscount)
              }원
            </p>
            <p>쿠폰 :&nbsp;
              <select onChange={(e) => handleSelectCoupon(e.target.value)}>
                <option value={0}>없음</option>
                {coupon.map(el => <option value={el.rate}>{el.name} - {el.rate}%</option>)}
              </select>
            </p>
          </div>

          <hr/>

          <div className='totalBox'>
            <p>Total : {handlingMonetaryUnit(total)}원</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
