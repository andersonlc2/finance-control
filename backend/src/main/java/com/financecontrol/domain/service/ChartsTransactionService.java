package com.financecontrol.domain.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.financecontrol.api.model.response.AnnualReportResponse;
import com.financecontrol.config.security.JWTAuthFilter;
import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.Transaction;
import com.financecontrol.domain.model.Type;
import com.financecontrol.domain.model.User;
import com.financecontrol.domain.repository.AccountRepository;
import com.financecontrol.domain.repository.TransactionRepository;
import com.financecontrol.domain.repository.TypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class ChartsTransactionService {

    private BalanceMonthService balanceMonthService;

    private CrudUserService crudUserService;

    private AccountRepository accountRepository;

    private TransactionRepository transactionRepository;

    private TypeRepository typeRepository;

    public List<AnnualReportResponse> getAnnualReport(String token) {
        List<Account> accountList = accountRepository.findByUser(this.setUserLogged(token));
        List<AnnualReportResponse> listAnnualReportResponse = new ArrayList<>();

        accountList.forEach(account -> {
            for (int i = 0; i < 12; i++) {
                AnnualReportResponse annualReportResponse = new AnnualReportResponse();
                double expenseMonth = balanceMonthService.getMonthExpenses(account.getId(), i);
                double incomeMonth = balanceMonthService.getMonthIncome(account.getId(), i);

                annualReportResponse.setMonth(i);
                annualReportResponse.setExpenses(expenseMonth);
                annualReportResponse.setIncomes(incomeMonth);
                if (annualReportResponse.getExpenses() != 0 | annualReportResponse.getIncomes() != 0) {
                    listAnnualReportResponse.add(annualReportResponse);
                }
            }
        });

        return listAnnualReportResponse;
    }

    public Map<String, Double> getTotalExpensesType(String token) {
        List<Account> accountList = accountRepository.findByUser(this.setUserLogged(token));
        Map<String, Double> resultType = new TreeMap<>();

        accountList.forEach(account -> {
            List<Transaction> transactionList = transactionRepository.findTotalExpensesTypes(account);
            transactionList.forEach(transaction -> {
                var type = transaction.getType();
                if (resultType.containsKey(type.getName())) {
                    var sum = resultType.get(type.getName()) + transaction.getValue();
                    resultType.put(type.getName(), sum);
                } else {
                    resultType.put(type.getName(), transaction.getValue());
                }
            });
        });

        return resultType;
    }

    private User setUserLogged(String token) {
        String userLogged = JWT.require(Algorithm.HMAC512(JWTAuthFilter.KEY)).build().verify(token).getSubject();

        return crudUserService.findByEmail(userLogged);
    }
}
