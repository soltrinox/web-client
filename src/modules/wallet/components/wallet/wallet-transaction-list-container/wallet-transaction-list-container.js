import { connect } from "react-redux";
import React, { Component } from "react";

import walletActions from "../../../actions/wallet-actions";
import WalletTransactionList from "./wallet-transaction-list/wallet-transaction-list";
import Pager from "react-pager";
class WalletTransactionListContainer extends Component {
  getFilter = props => (props.queryParams ? props.queryParams.filter : "All");

  componentWillMount() {
    this.props.fetchTransactions(this.getFilter(this.props), this.props.paging);
  }

  componentWillReceiveProps(nextProps) {
    if (this.getFilter(this.props) !== this.getFilter(nextProps)) {
      this.props.fetchTransactions(this.getFilter(nextProps));
    }
  }

  render() {
    const { isPending, transactions } = this.props;

    if (isPending || transactions === undefined) {
      return null;
    }

    return <WalletTransactionList transactions={transactions} />;
  }
}
const mapStateToProps = state => {
  const paging = state.walletData.transactions.paging;
  const { isPending, data } = state.walletData.transactions.items;

  let transactions;
  if (data) {
    transactions = data.transactions;
  }
  return { isPending, transactions, paging };
};

const mapDispatchToProps = dispatch => ({
  fetchTransactions: (filter, paging) => {
    dispatch(walletActions.fetchWalletTransactions(filter, paging));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletTransactionListContainer
);
