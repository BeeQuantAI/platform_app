'use client';

import React from 'react';
import './main.css';
import './tabler-icons.min.css';
import 'bootstrap/dist/css/bootstrap.css';

function HomeContainer() {
  return (
    <body className="body body--home">
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__content">
                <button className="header__btn" type="button" aria-label="header__nav">
                  <span />
                  <span />
                  <span />
                </button>
                <a href="/" className="header__logo">
                  <img src="img/logo/logo_dark.png" alt="" />
                </a>
                <span className="header__tagline">BeeQuant AI</span>
                <ul className="header__nav" id="header__nav">
                  <li>
                    <a href="#">Home</a>
                  </li>

                  <li>
                    <a href="#">Company</a>
                  </li>
                </ul>
                <div className="header__language">
                  <a
                    className="dropdown-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    EN
                    <i className="ti ti-point-filled" />
                  </a>
                  <ul className="dropdown-menu header__language-menu">
                    <li>
                      <a href="#">English</a>
                    </li>
                    <li>
                      <a href="#">Chinese</a>
                    </li>
                  </ul>
                </div>
                <a href="/login" className="header__profile">
                  <i className="ti ti-user-circle" />
                  <span>Sign In</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-7">
              <div className="hero__content hero__content--first">
                <h1 className="hero__title">
                  <strong>AI</strong> for trading in the crypto industry
                </h1>
                <div className="hero__btns">
                  <a href="/register" className="hero__btn">
                    Register
                  </a>
                  <a href="#" className="hero__btn hero__btn--light">
                    About us
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="hero__content hero__content--second">
                <a href="/register" className="cta">
                  <h2 className="cta__title">Registration Open For Limited Time</h2>
                  <p className="cta__text">
                    Sign up and take part in our alpha test, get a chance to win
                    <b> $500 Prize!</b> <br />
                    The number of registration spots is limited.
                  </p>
                  <div className="progressbar">
                    <h3 className="progressbar__title">Spots:</h3>
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Animated striped"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        style={{ width: '75%' }}
                      >
                        <span>75</span>
                      </div>
                    </div>
                    <div className="progressbar__values">
                      <span className="progressbar__value progressbar__value--left">0</span>
                      <span className="progressbar__value progressbar__value--right">100</span>
                    </div>
                  </div>
                  <span className="block-icon block-icon--red">
                    <i className="ti ti-gift" />
                  </span>
                  <span className="screw screw--lines-bl" />
                  <span className="screw screw--lines-br" />
                  <span className="screw screw--lines-tr" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stats">
                <span className="stats__value">839</span>
                <p className="stats__name">Days on the market</p>

                <span className="stats__dodger stats__dodger--left stats__dodger--purple" />
                <span className="stats__dodger stats__dodger--right stats__dodger--purple" />
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stats">
                <span className="stats__value">12812</span>
                <p className="stats__name">Members</p>
                <span className="stats__dodger stats__dodger--left stats__dodger--orange" />
                <span className="stats__dodger stats__dodger--right stats__dodger--orange" />
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stats">
                <span className="stats__value">1403</span>
                <p className="stats__name">Support trading pairs</p>
                <span className="stats__dodger stats__dodger--left stats__dodger--green" />
                <span className="stats__dodger stats__dodger--right stats__dodger--green" />
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stats">
                <span className="stats__value">over $1 bn.</span>
                <p className="stats__name">Total earned</p>
                <span className="stats__dodger stats__dodger--left stats__dodger--blue" />
                <span className="stats__dodger stats__dodger--right stats__dodger--blue" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="section__title">
                <h2>Our features</h2>
                <p>
                  Whether you're a beginner or an experienced trader, our platform empowers you to
                  make informed decisions and your trading success.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="feature">
                <h3 className="feature__title">Safety</h3>
                <p className="feature__text">
                  We do not have access to your personal data and cannot withdraw funds
                </p>

                <span className="block-icon block-icon--orange">
                  <i className="ti ti-shield-dollar" />
                </span>
                <span className="screw screw--bl" />
                <span className="screw screw--tr" />
                <span className="screw screw--big-br" />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="feature">
                <h3 className="feature__title">Automatization</h3>
                <p className="feature__text">Automatic trade and deal closing</p>

                <span className="block-icon block-icon--green">
                  <i className="ti ti-24-hours" />
                </span>
                <span className="screw screw--bl" />
                <span className="screw screw--tr" />
                <span className="screw screw--big-br" />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="feature">
                <h3 className="feature__title">Analytics</h3>
                <p className="feature__text">
                  The robot shows you how your trades are performing in real time
                </p>
                <span className="block-icon block-icon--blue">
                  <i className="ti ti-chart-histogram" />
                </span>
                <span className="screw screw--bl" />
                <span className="screw screw--tr" />
                <span className="screw screw--big-br" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
              <div className="section__title">
                <h2>Trending Deals</h2>
                <p>
                  Browse a curated list of real-time trading deals, complete with detailed
                  information about the involved cryptocurrencies and exchanges.
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="deals">
                <div className="deals__table-wrap">
                  <table className="deals__table">
                    <thead>
                      <tr>
                        <th>Pair</th>
                        <th>Exchange</th>
                        <th>Date</th>
                        <th>Buying price</th>
                        <th>Selling price</th>
                        <th>Deal amount</th>
                        <th>Profit</th>
                        <th>Spread</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="deals__text">BNB/USDT</div>
                        </td>
                        <td>
                          <div className="deals__exchange">
                            <img src="/img/exchanges/binance.png" alt="" />
                            <span className="green">Binance</span>
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">15.4.24 01:09</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--buy">
                            <i className="ti ti-currency-dollar" />
                            304.3
                          </div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--sell">
                            <i className="ti ti-currency-dollar" />
                            305
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">$4 259</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--green">+$9.80</div>
                        </td>
                        <td>
                          <div className="deals__text">0.23%</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="deals__text">SOL/USDT</div>
                        </td>
                        <td>
                          <div className="deals__exchange">
                            <img src="img/exchanges/bitfinex.png" alt="" />
                            <span className="green">Bitfinex</span>
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">15.4.24 01:01</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--buy">
                            <i className="ti ti-currency-dollar" />
                            333.32
                          </div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--sell">
                            <i className="ti ti-currency-dollar" />
                            333.7
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">$8 204</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--green">+$9.35</div>
                        </td>
                        <td>
                          <div className="deals__text">0.11%</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="deals__text">ALGO/USDT</div>
                        </td>
                        <td>
                          <div className="deals__exchange">
                            <img src="img/exchanges/bithumb.png" alt="" />
                            <span className="green">Bithumb</span>
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">15.4.24 00:57</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--buy">
                            <i className="ti ti-currency-dollar" />
                            0.2181
                          </div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--sell">
                            <i className="ti ti-currency-dollar" />
                            0.21847
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">$8 040</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--green">+$13.64</div>
                        </td>
                        <td>
                          <div className="deals__text">0.17%</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="deals__text">BNB/USDT</div>
                        </td>
                        <td>
                          <div className="deals__exchange">
                            <img src="img/exchanges/coincheck.png" alt="" />
                            <span className="green">Coincheck</span>
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">15.4.24 00:51</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--buy">
                            <i className="ti ti-currency-dollar" />
                            1739.15
                          </div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--sell">
                            <i className="ti ti-currency-dollar" />
                            1741.32
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">$7 599</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--green">+$9.48</div>
                        </td>
                        <td>
                          <div className="deals__text">0.12%</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="deals__text">MATIC/USDT</div>
                        </td>
                        <td>
                          <div className="deals__exchange">
                            <img src="img/exchanges/kucoin.png" alt="" />
                            <span className="green">Kucoin</span>
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">15.4.24 00:48</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--buy">
                            <i className="ti ti-currency-dollar" />
                            2.1
                          </div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--sell">
                            <i className="ti ti-currency-dollar" />
                            2.3
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">$999</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--green">+$7.24</div>
                        </td>
                        <td>
                          <div className="deals__text">0.28%</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="deals__text">SOL/USDT</div>
                        </td>
                        <td>
                          <div className="deals__exchange">
                            <img src="img/exchanges/upbit.png" alt="" />
                            <span className="green">Upbit</span>
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">15.4.24 00:42</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--buy">
                            <i className="ti ti-currency-dollar" />
                            0.59
                          </div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--sell">
                            <i className="ti ti-currency-dollar" />
                            0.61
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">$3 524</div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--green">+$12.05</div>
                        </td>
                        <td>
                          <div className="deals__text">0.18%</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <span className="screw screw--lines-bl" />
                <span className="screw screw--lines-br" />
                <span className="screw screw--lines-tr" />
                <span className="screw screw--lines-tl" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row row--relative">
            <div className="col-12 col-lg-6">
              <div className="invest">
                <h2 className="invest__title">For Investors</h2>
                <ul className="invest__list">
                  <li>
                    -<b> 3 types</b> of ai trading bots with
                    <b> customizable and configurable</b> features;
                  </li>
                  <li>
                    -<b> Tailored</b> bots and services;
                  </li>
                  <li>- Other rewards and bonuses;</li>
                </ul>
                <a href="#" className="invest__link">
                  More benefits
                </a>
                <span className="block-icon block-icon--orange">
                  <i className="ti ti-database-dollar" />
                </span>
                <span className="screw screw--lines-bl" />
                <span className="screw screw--lines-br" />
                <span className="screw screw--lines-tr" />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="invest">
                <h2 className="invest__title">BeeQuant Token</h2>
                <div className="invest__rate-wrap">
                  <div className="invest__rate">
                    <span>Current course</span>
                    <p>1 BeeQuant Coin (BQC) = $0.791</p>
                  </div>
                  <div className="invest__graph">
                    <img src="img/graph/graph2.svg" alt="" />
                  </div>
                </div>
                <div className="invest__rate-wrap">
                  <div className="invest__rate">
                    <span>Week</span>
                    <p className="green">
                      +0.19%
                      <small>[0.84]</small>
                    </p>
                  </div>
                  <div className="invest__graph">
                    <img src="img/graph/graph1.svg" alt="" />
                  </div>
                </div>
                <a href="#" className="invest__link">
                  More about token
                </a>
                <span className="block-icon block-icon--blue">
                  <i className="ti ti-brand-coinbase" />
                </span>
                <span className="screw screw--lines-bl" />
                <span className="screw screw--lines-br" />
                <span className="screw screw--lines-tr" />
              </div>
            </div>
            <div className="section__canvas section__canvas--first" id="canvas" />
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 order-1 order-lg-4 order-xl-1">
              <div className="footer__logo">
                <img src="img/logo/logo_dark.png" alt="" />
              </div>
              <p className="footer__tagline">
                The BeeQuant AI team works hard
                <br />
                to deliver exceptional financial results
                <br />
                and increase our clients' revenue.
              </p>
              <div className="footer__currencies">
                <i className="ti ti-currency-bitcoin" />
                <i className="ti ti-currency-ethereum" />
                <i className="ti ti-currency-litecoin" />
                <i className="ti ti-currency-solana" />
                <i className="ti ti-currency-dogecoin" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 col-xl-2 order-3 order-md-2 order-lg-2 order-xl-3 offset-md-2 offset-lg-0">
              <h6 className="footer__title">Company</h6>
              <div className="footer__nav">
                <a href="#">About BeeQuant AI</a>
                <a href="#">Our news</a>
                <a href="#">License</a>
                <a href="#">Contacts</a>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-6 col-xl-4 order-2 order-md-3 order-lg-1 order-xl-2">
              <div className="row">
                <div className="col-12">
                  <h6 className="footer__title">Services & Features</h6>
                </div>
                <div className="col-6">
                  <div className="footer__nav">
                    <a href="#">Invest</a>
                    <a href="#">Token</a>
                    <a href="#">Affiliate</a>
                    <a href="#">Contest</a>
                  </div>
                </div>
                <div className="col-6">
                  <div className="footer__nav">
                    <a href="#">Safety</a>
                    <a href="#">Automatization</a>
                    <a href="#">Analytics</a>
                    <a href="#">Reports</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 col-xl-2 order-4 order-md-4 order-lg-3 order-xl-4">
              <h6 className="footer__title">Support</h6>
              <div className="footer__nav">
                <a href="#">Help center</a>
                <a href="#">How it works</a>
                <a href="#">Privacy policy</a>
                <a href="#">Terms & conditions</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="footer__content">
                <div className="footer__social">
                  <a href="#" target="_blank">
                    <i className="ti ti-brand-facebook" />
                  </a>
                  <a href="#" target="_blank">
                    <i className="ti ti-brand-x" />
                  </a>
                  <a href="#" target="_blank">
                    <i className="ti ti-brand-instagram" />
                  </a>
                  <a href="#" target="_blank">
                    <i className="ti ti-brand-telegram" />
                  </a>
                  <a href="#" target="_blank">
                    <i className="ti ti-brand-discord" />
                  </a>
                  <a href="#" target="_blank">
                    <i className="ti ti-brand-linkedin" />
                  </a>
                </div>
                <small className="footer__copyright">© BeeQuant AI, 2024.</small>
              </div>
            </div>
          </div>
        </div>
        <span className="screw screw--footer screw--footer-bl" />
        <span className="screw screw--footer screw--footer-br" />
        <span className="screw screw--footer screw--footer-tr" />
        <span className="screw screw--footer screw--footer-tl" />
      </footer>
    </body>
  );
}

export default HomeContainer;
