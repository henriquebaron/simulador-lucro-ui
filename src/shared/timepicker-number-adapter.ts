import { Component, Injectable } from "@angular/core";
import { NgbTimeStruct, NgbTimeAdapter } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class NgbTimeDateAdapter extends NgbTimeAdapter<Date>{
    fromModel(value: Date | null): NgbTimeStruct | null {
        if (!value) {
            return null;
        }

        return {
            hour: value.getHours(),
            minute: value.getMinutes(),
            second: value.getSeconds()
        };
    }

    toModel(time: NgbTimeStruct | null): Date | null {
        var result = new Date(Date.now());
        const hour = time?.hour != null ? time.hour : 0;
        const minute = time?.minute != null ? time.minute : 0;
        const second = time?.second != null ? time.second : 0;
        result.setHours(hour, minute, second);
        return result;
    }
}