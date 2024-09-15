import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function DetailsCard({label, value}: {label:string, value: string | number}) {
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row flex-wrap">
                    {value}
                </div>
            </CardContent>
        </Card>
    );
}