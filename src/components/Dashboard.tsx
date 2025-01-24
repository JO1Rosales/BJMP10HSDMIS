import { Card } from "@/components/ui/card";
import {
  Package,
  AlertTriangle,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 280 },
  { name: "Fri", value: 590 },
  { name: "Sat", value: 320 },
  { name: "Sun", value: 480 },
];

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  icon: any;
  trend?: string;
}) => (
  <Card className="p-6 hover:shadow-lg transition-shadow duration-200 animate-slideUp">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <h3 className="text-2xl font-semibold mt-2 text-gray-900">{value}</h3>
        {trend && (
          <p className="flex items-center gap-1 text-sm text-green-600 mt-2">
            <ArrowUpRight className="w-4 h-4" />
            {trend}
          </p>
        )}
      </div>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome to your inventory overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Items"
          value="2,420"
          icon={Package}
          trend="+5.25% this week"
        />
        <StatCard
          title="Low Stock Items"
          value="12"
          icon={TrendingDown}
          trend="4 items need restock"
        />
        <StatCard
          title="Expiring Soon"
          value="8"
          icon={AlertTriangle}
          trend="Within 30 days"
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Weekly Stock Movement
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#4ade80"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
