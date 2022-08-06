package com.financecontrol.domain.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.financecontrol.api.model.response.AnnualReportResponse;
import com.financecontrol.config.security.JWTAuthFilter;
import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.User;
import com.financecontrol.domain.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@AllArgsConstructor
@Service
public class ChartsTransactionService {

    private BalanceMonthService balanceMonthService;

    private SearchAccountService searchAccountService;

    private CrudUserService crudUserService;

    private AccountRepository accountRepository;

    public List<AnnualReportResponse> getAnnualReport(Pageable pageable, String token) {
        String userLogged = JWT.require(Algorithm.HMAC512(JWTAuthFilter.KEY)).build().verify(token).getSubject();

        User user = crudUserService.findByEmail(userLogged);
        Page<Account> accountList = accountRepository.findByUser(pageable, user);
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
}
