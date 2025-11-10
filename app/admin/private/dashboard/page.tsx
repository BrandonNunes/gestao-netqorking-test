"use client";
import { TrendingUp } from "lucide-react";
import {
  Pie,
  PieChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  Bar,
  BarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { status: "ativos", total: 105, fill: "green" },
  { status: "inativos", total: 16, fill: "red" },
];

const chartData2 = [
  { mes: "Janeiro", indicacoes: 186 },
  { mes: "Fevereiro", indicacoes: 305 },
  { mes: "Março", indicacoes: 237 },
  { mes: "Abril", indicacoes: 73 },
  { mes: "Maio", indicacoes: 209 },
  { mes: "Junho", indicacoes: 214 },
];

const chartData3 = [
  { mes: "Janeiro", obrigados: 186 },
  { mes: "Fevereiro", obrigados: 305 },
  { mes: "Março", obrigados: 237 },
  { mes: "Abril", obrigados: 73 },
  { mes: "Maio", obrigados: 209 },
  { mes: "Junho", obrigados: 214 },
];

const chartConfig3 = {
  obrigados: {
    label: "Obrigados",
    color: "blue",
  },
} satisfies ChartConfig;

const chartConfig2 = {
  indicacoes: {
    label: "Indicações",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartConfig = {
  total: {
    label: "Total",
  },
  ativos: {
    label: "Ativos",
    color: "var(--chart-1)",
  },
  inativos: {
    label: "Inativos",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  return (
    <div className="w-full h-full overflow-auto flex items-center justify-between gap-4">
      <Card className="flex flex-col flex-1 min-w-[500px]">
        <CardHeader className="items-center pb-0">
          <CardTitle>Número total de membros ativos e e inativos.</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="total" nameKey="status" />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="flex flex-col flex-1 min-w-[500px]">
        <CardHeader>
          <CardTitle>Total de indicações feitas no mês.</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig2}>
            <LineChart
              accessibilityLayer
              data={chartData2}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="mes"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="indicacoes"
                type="natural"
                stroke="blue"
                strokeWidth={2}
                dot={{
                  fill: "blue",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="flex flex-col flex-1 min-w-[500px]">
        <CardHeader>
          <CardTitle>
            Total de &quot;obrigados&quot; registrados no mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig3}>
            <BarChart accessibilityLayer data={chartData3}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="mes"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="obrigados" fill="gray" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
