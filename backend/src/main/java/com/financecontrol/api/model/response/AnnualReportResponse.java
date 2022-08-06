package com.financecontrol.api.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnnualReportResponse {

    private Double expenses;
    private Double incomes;
    private Integer month;

}
