export class ConversaoHora {
    static getStringHora(date: Date): string {
        return date.getHours().toString().padStart(2, "0") + ":" +
            date.getMinutes().toString().padStart(2, "0");
    }

    static getDateFromString(dateString: string): Date {
        var result = new Date(Date.now());
        var partesString = dateString.split(":");
        result.setHours(Number.parseInt(partesString[0]), Number.parseInt(partesString[1]));
        return result;
    }
}